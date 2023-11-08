# Python
import shutil
import os
from datetime import datetime
# Pydantic

# Fastapi
from fastapi.responses import FileResponse
from fastapi import APIRouter, Path, HTTPException, Form, Response, Request
from fastapi.params import Depends, Header
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordBearer

# Terceros
from sqlalchemy.orm import Session
from sqlalchemy import func
import pandas as pd
import numpy as np
from openpyxl.workbook import Workbook

# Modulos locales
from app.models.events import Historico
from app.database.connection import get_session, engine
from app.auth.jwt_bearer import jwtBearer, decodeJWT



event_router = APIRouter(
    tags=["Events"]
)


@event_router.get(
    path="/serial/{serial}",
    summary="Muestra el serial indicado",
    dependencies=[Depends(jwtBearer())]
)
async def get_serial(
    request: Request,
    serial: str = Path(
        ...,
        description="Ingrese el numero serial que desea consultar",
        example="2208092647004648"
    ),
        db: Session = Depends(get_session)
):
    authorization = request.headers.get("Authorization")
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Esquema de autenticación inválido"
        )

    # Extrae el token sin el prefijo "Bearer"
    token = authorization.split(" ")[1]
    
    # Decodifica el token y obtén el payload
    payload = decodeJWT(token)

    companyID = payload['companyID']

    if companyID == 11:
        serial = db.query(Historico).filter(Historico.serial == serial).all()
    else:
        serial = db.query(Historico).filter(
            Historico.serial == serial,
            Historico.cod_ent == companyID
        ).all()

    if serial:
        return serial
    else:
        raise HTTPException(status_code=404, detail="Serial no encontrado")


@event_router.get(
    path="/dirnum/{dirnum}",
    summary="Muestra los resultados de una direccion numerica especifica",
    dependencies=[Depends(jwtBearer())]
)
async def get_dirnum(
    dirnum: str = Path(
        ...,
        description="Ingrese el numero de orden que desea buscar",
        example="130131003004100123"
    ),
    db: Session = Depends(get_session),
    limit: int = 10
):
    """
    Base de datos de Servilla

    Muestra todos los registros de una orden específica 

    Requerimientos:
        -

    """
    dirnum = db.query(Historico).filter(
        Historico.dir_num == dirnum).limit(limit).all()
    return dirnum

    

@event_router.get(
    path="/ventasMes",
    summary="Resumen de las vendas mensuales",
    # dependencies=[Depends(jwtBearer())]
)
async def get_ventas_mes(
    db: Session = Depends(get_session),
):
    query = db.query(
        func.LEFT(Historico.f_emi, 7).label('mes'),
        func.count(Historico.serial).label('total'),
        func.sum(Historico.valor).label('ventas')
    ).filter(
        func.LENGTH(Historico.f_emi) == 10,
        func.LEFT(Historico.f_emi, 3) == '202',
        Historico.retorno != 'p'
    ).group_by('mes')

    results = query.all()

    # Crear una lista de resultados en formato JSON
    ventas_mes = [
        {
            "mes": result.mes,
            "total": result.total,
            "ventas": result.ventas
        }
        for result in results
    ]

    # Devolver la lista de resultados como una respuesta JSON
    return {"ventas_mes": ventas_mes}



