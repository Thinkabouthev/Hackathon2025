from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import requests
import json
import re
from threading import Lock
from datetime import datetime

router = APIRouter()

# === ARCHETYPE CONFIG ===
ARCHETYPES = [
    {"archetype": "Генерал-Зайка", "mentor_name": "Диана", "emoji": "🔥"},
    {"archetype": "Уютный Резерв", "mentor_name": "Бернар", "emoji": "🌤"},
    {"archetype": "Спокойный Стёб", "mentor_name": "Абай", "emoji": "🌊"},
    {"archetype": "Заряд Хаоса", "mentor_name": "Бахредин", "emoji": "⚡️"},
]

current_index = 0
user_id_counter = 0  # Простой счетчик для ID
lock = Lock()

# === COMPETITION STATE ===
user_assignments = {}  # {user_id: {"name": str, "archetype": str, "mentor_name": str, "emoji": str, "assigned_at": datetime}}
competition_winner = None  # {"user_id": str, "name": str, "mentor_name": str, "completed_at": datetime}
competition_lock = Lock()

# === MODELS ===

class UserDescription(BaseModel):
    name: str
    description: str

class ArchetypeResult(BaseModel):
    name: str
    archetype: str
    mentor_name: str
    emoji: str
    comment: str
    user_id: int  # Изменили на int

class CompletionRequest(BaseModel):
    user_id: int  # Изменили на int

class CompletionResult(BaseModel):
    success: bool
    message: str
    winner_name: str = None
    winner_mentor: str = None
    user_id: int = None  # Изменили на int

# === ENV CONFIG ===

AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
AZURE_OPENAI_KEY = os.getenv("AZURE_OPENAI_KEY")
AZURE_OPENAI_DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT")
AZURE_OPENAI_API_VERSION = os.getenv("AZURE_OPENAI_API_VERSION")

# === ENDPOINTS ===

@router.post("/assign-archetypes", response_model=ArchetypeResult)
def assign_archetypes(user: UserDescription):
    global current_index, user_id_counter
    
    with lock:
        chosen = ARCHETYPES[current_index % len(ARCHETYPES)]
        current_index += 1
        
        # Генерируем простой ID
        user_id_counter += 1
        user_id = user_id_counter
    
    # Подготовка запроса к OpenAI для генерации комментария
    comment_prompt = (
        f"Пользователь:\n{user.description}\n\n"
        f"Он был распределён в клан '{chosen['archetype']}' под наставничество {chosen['mentor_name']} ({chosen['emoji']}). "
        f"Напиши короткий, тёплый, вдохновляющий комментарий в стиле этого ментора — как будто он лично приветствует участника."
    )
    
    messages = [
        {"role": "system", "content": "Ты — наставник хакатона. Пиши вдохновляющие комментарии для новых участников клана."},
        {"role": "user", "content": comment_prompt}
    ]
    
    url = f"{AZURE_OPENAI_ENDPOINT}openai/deployments/{AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version={AZURE_OPENAI_API_VERSION}"
    headers = {
        "Content-Type": "application/json",
        "api-key": AZURE_OPENAI_KEY
    }
    
    data = {
        "messages": messages,
        "temperature": 0.5,
        "max_tokens": 150
    }
    
    response = requests.post(url, headers=headers, json=data)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    
    try:
        content = response.json()["choices"][0]["message"]["content"].strip()
        
        # Сохраняем информацию о пользователе
        with competition_lock:
            user_assignments[user_id] = {
                "name": user.name,
                "archetype": chosen["archetype"],
                "mentor_name": chosen["mentor_name"],
                "emoji": chosen["emoji"],
                "assigned_at": datetime.now()
            }
        
        return {
            "name": user.name,
            "archetype": chosen["archetype"],
            "mentor_name": chosen["mentor_name"],
            "emoji": chosen["emoji"],
            "comment": content,
            "user_id": user_id
        }
    
    except (KeyError, IndexError, json.JSONDecodeError, ValueError) as e:
        raise HTTPException(status_code=500, detail=f"Ошибка при обработке ответа OpenAI: {str(e)}")

@router.post("/complete", response_model=CompletionResult)
def complete_competition(completion: CompletionRequest):
    global competition_winner
    
    with competition_lock:
        # Проверяем, существует ли пользователь с таким ID
        if completion.user_id not in user_assignments:
            raise HTTPException(status_code=404, detail="Пользователь с таким ID не найден")
        
        # Проверяем, есть ли уже победитель
        if competition_winner is not None:
            user_info = user_assignments[completion.user_id]
            return CompletionResult(
                success=False,
                message=f"Соревнование уже завершено! Победитель: {competition_winner['name']} ({competition_winner['mentor_name']})",
                winner_name=competition_winner['name'],
                winner_mentor=competition_winner['mentor_name'],
                user_id=completion.user_id
            )
        
        # Устанавливаем победителя
        user_info = user_assignments[completion.user_id]
        competition_winner = {
            "user_id": completion.user_id,
            "name": user_info["name"],
            "mentor_name": user_info["mentor_name"],
            "completed_at": datetime.now()
        }
        
        return CompletionResult(
            success=True,
            message=f"Поздравляем! {user_info['name']} первым завершил соревнование!",
            winner_name=user_info["name"],
            winner_mentor=user_info["mentor_name"],
            user_id=completion.user_id
        )

@router.get("/competition-status")
def get_competition_status():
    """Получить текущий статус соревнования"""
    with competition_lock:
        if competition_winner is None:
            return {
                "status": "ongoing",
                "participants_count": len(user_assignments),
                "winner": None
            }
        else:
            return {
                "status": "completed",
                "participants_count": len(user_assignments),
                "winner": {
                    "name": competition_winner["name"],
                    "mentor_name": competition_winner["mentor_name"],
                    "completed_at": competition_winner["completed_at"].isoformat()
                }
            }

@router.post("/reset-competition")
def reset_competition():
    """Сбросить состояние соревнования (для тестирования)"""
    global competition_winner, user_assignments, user_id_counter
    
    with competition_lock:
        competition_winner = None
        user_assignments.clear()
        user_id_counter = 0  # Сбрасываем счетчик ID
    
    return {"message": "Соревнование сброшено"}