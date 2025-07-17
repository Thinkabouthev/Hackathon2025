from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.ai import router as chat_router
from app.archetype import router as archetype_router

app = FastAPI(
    title="AI Mentor Archetype API",
    description="Сервис для анализа анкет участников и распределения по менторским архетипам.",
    version="1.0.0"
)

# Разрешить CORS только для React-приложения на localhost:3000
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение роутеров
app.include_router(chat_router, tags=["Chat"])
app.include_router(archetype_router, tags=["Archetype Analysis"])

