from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import requests

router = APIRouter()

# Модель запроса от пользователя
class ChatRequest(BaseModel):
    message: str                      # Новое сообщение пользователя
    history: list[dict] = []         # История чата: [{"role": "...", "content": "..."}]

# Получаем данные из переменных окружения
AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
AZURE_OPENAI_KEY = os.getenv("AZURE_OPENAI_KEY")
AZURE_OPENAI_DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT")
AZURE_OPENAI_API_VERSION = os.getenv("AZURE_OPENAI_API_VERSION")

@router.post("/chat")
def chat_with_ai(payload: ChatRequest):
    # Формируем полный список сообщений
    messages = payload.history + [{"role": "user", "content": payload.message}]
    
    # Конечная точка Azure OpenAI
    url = f"{AZURE_OPENAI_ENDPOINT}openai/deployments/{AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version={AZURE_OPENAI_API_VERSION}"
    
    headers = {
        "Content-Type": "application/json",
        "api-key": AZURE_OPENAI_KEY
    }

    data = {
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 1024 
    }

    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    # Достаём только текст ответа ассистента
    result = response.json()
    try:
        content = result["choices"][0]["message"]["content"]
        return {"response": content}
    except (KeyError, IndexError):
        raise HTTPException(status_code=500, detail="Invalid response format from OpenAI API")