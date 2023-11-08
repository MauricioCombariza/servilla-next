from pydantic import EmailStr

from fastapi import Request, Response
from fastapi.params import Depends
from fastapi import APIRouter, HTTPException, Form, status, Body

from app.database.connection import get_session
from app.models.users import User
from app.security.security import get_password_hash, verify_password
from app.schemas.schemas import UserLoginSchema
from app.auth.jwt_handler import signJWT, decodeJWT

from sqlalchemy.orm import Session

user_router = APIRouter(
    tags=["User"],
)


@user_router.post("/signup")
async def sign_user_up(db: Session = Depends(get_session),
                       email: EmailStr = Form(
        ...,
        title="Email o correo electrónico",
        description="Email con el que desea registrarse",
        example="mauricio.combariza@gruposervilla.com"),
    username: str = Form(
        ...,
        title="Usuario",
        description="Escriba el nombre de su usuario con una sola palabra",
        example="NombreApellido"),
    password: str = Form(
        ...,
        title="Password o contraseña",
        description="Contraseña única de mínimo 6 caracteres y máximo 14",
        example="123456"),
    confirmPassword: str = Form(
        ...,
        title="Confirmar Password o contraseña",
        description="Contraseña única de mínimo 6 caracteres y máximo 14",
        example="123456"),


) -> dict:
    users = db.query(User).all()

    for user in users:
        if email == user.email:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="El email ya ha sido registrado!!"
            )

    if password != confirmPassword:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="El password es diferente de su confirmación !!"
        )

    user = User(email=email, username=username, password=get_password_hash(password), activate=1, perfil=3, company=1)
    db.add(user)
    db.commit()
    return {
        "message": "El usuario ha sido registrado de forma existosa!"
    }



@user_router.post("/login")
async def sign_user_in(resp: Response,
                       db: Session = Depends(get_session),
                       email: EmailStr = Form(..., title="Email o correo electrónico",
                                              description="Email con el que desea registrarse",
                                              example="mauricio.combariza@gruposervilla.com"),
                       password: str = Form(..., title="Password o contraseña",
                                             description="Contraseña única de mínimo 6 caracteres y máximo 14",
                                             example="123456")
                       ) -> dict:
    user = find_user(db, email, password)
    if user:
        token = signJWT(email, user.perfil, user.username, user.company)
        resp.headers["Authorization"] = f"Bearer {token}"
        user_data = {
            "email": email,
            "perfil": user.perfil,
            "username": user.username,
            "activate": user.activate,
            "perfil": user.perfil,
            "company": user.company
        }
        print('User: ',user_data)
        return {"token": token, "user": user_data}
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Verifique su email, contraseña o que siga activo en la plataforma. ¡Haga clic en registrarse!"
        )

def find_user(db: Session, email: str, password: str) -> User:
    users = db.query(User).all()
    for user in users:
        if email == user.email and verify_password(password, user.password):
            return user
    return None
