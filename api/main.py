from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import conn
from app.routes.users import user_router
from app.routes.events import event_router
from app.routes.documents import document_router

import uvicorn


app = FastAPI()


# Establezco una ruta para evitar los cors

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register routes

app.include_router(user_router,  prefix="/user")
app.include_router(event_router, prefix="/event")
app.include_router(document_router, prefix="/document")


@app.on_event("startup")
def on_startup():
    conn()


@app.get("/")
async def home():
    return RedirectResponse(url="/api/")


@app.get("/api")
async def inicio():
    return {"Hola": "Mauricio, bienvenido a FastApi"}


if __name__ == '__main__':
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
