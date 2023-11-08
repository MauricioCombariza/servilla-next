# Python
import shutil
from io import BytesIO
import os
import re
import tempfile
from datetime import datetime
# Pydantic

# Fastapi
from fastapi.responses import StreamingResponse, FileResponse
from fastapi import APIRouter, Path, HTTPException, Form, File, UploadFile, Request
from fastapi.params import Depends

# Terceros
from sqlalchemy.orm import Session
import pandas as pd
import numpy as np
from typing import List

# Modulos locales
from app.models.events import Historico
from app.database.connection import get_session, engine
from app.auth.jwt_bearer import jwtBearer, decodeJWT
from app.database.lists.lists import regex


document_router = APIRouter(
    tags=["Documents"]
)

@document_router.post("/direcciones/")
def ajusteDireccion(file: UploadFile = File(...)):
    # archivo = "/mnt/c/Users/mcomb/OneDrive/Escritorio/Carvajal/python/original_direcciones.txt"
    global upload_folder
    upload_folder = '/mnt/c/Users/mcomb/OneDrive/Escritorio/Carvajal/python/direcciones'
    file_object = file.file
    #create empty file to copy the file_object to
    upload_folder = open(os.path.join(upload_folder, file.filename), 'wb+')
    shutil.copyfileobj(file_object, upload_folder)
    upload_folder.close()
    archivo = '/mnt/c/Users/mcomb/OneDrive/Escritorio/Carvajal/python/direcciones/{}'.format(file.filename)
    for i in range (0, len(regex)):
        with open(archivo, 'r', encoding='utf8', errors='ignore') as file:
            contenido = file.read()
            # Realizar el reemplazo con la función sub() de re
            contenido_nuevo = re.sub(regex[i]['patron'], regex[i]['reemplazo'], contenido)
            # Sobrescribir el archivo con el contenido nuevo
            with open(archivo, 'w') as file:
                file.write(contenido_nuevo)
    nombre_archivo_entrada = archivo
    nombre_archivo_salida = '/mnt/c/Users/mcomb/OneDrive/Escritorio/Carvajal/python/direcciones/direcciones_salida.txt'

    with open(nombre_archivo_entrada, 'r') as archivo_entrada, open(nombre_archivo_salida, 'w') as archivo_salida:
        for linea in archivo_entrada:
            linea_modificada = re.sub(r'^(\w{2})(\s?\s?\s?\s)?(\d\d?\d?)(\s?\s?\s?\s)?(BIS|Bis|bis)?(\s?\s?\s?\s)?([a-zA-Z])?(\s?\s?\s?\s)?(BIS|Bis|bis)?(\s?\s?\s?\s)?(\d\d?\d?)(\s?\s)?([a-zA-Z])?(\s?\s?\s?\s)?(\d\d)', r'\1 \3\5\7\9 \11\13 \15', linea)
            archivo_salida.write(linea_modificada)    
        
@document_router.post("/upload/")
def create_file(file: UploadFile = File(...)):
    global upload_folder
    upload_folder = '/mnt/c/Users/mcomb/OneDrive/Escritorio/Carvajal/python/pendientes'
    file_object = file.file
    #create empty file to copy the file_object to
    upload_folder = open(os.path.join(upload_folder, file.filename), 'wb+')
    shutil.copyfileobj(file_object, upload_folder)
    upload_folder.close()
    return {"filename": file.filename}

@document_router.get("/download")
def download():
    
    # Genera un DataFrame simple con pandas
    data = {'Nombre': ['Alice', 'Bob', 'Charlie'],
            'Edad': [25, 30, 35]}
    df = pd.DataFrame(data)

    # Crea un archivo temporal en el sistema de archivos
    with tempfile.NamedTemporaryFile(suffix=".xlsx", delete=False) as temp_file:
        # Escribe el DataFrame en un archivo Excel
        df.to_excel(temp_file.name, index=False, sheet_name='Hoja1')

    # Devuelve el archivo Excel para descargar
    return FileResponse(temp_file.name, filename="datos.xlsx")

@document_router.get(
        path="/documentos/pendientes_carvajal",
        summary="Descarga un archivo con los pendientes de las ordenes solicitados",
)
def pendientes_carvajal(ordenInicial: int, ordenFinal: int, db: Session = Depends(get_session)):
    # Realiza la consulta SQLAlchemy y selecciona solo las columnas deseadas
    resultados = db.query(Historico.serial, Historico.cod_men, Historico.retorno).filter(
    Historico.orden >= ordenInicial,
    Historico.orden <= ordenFinal,
    Historico.cod_ent == 4000,  # Agrega esta condición,
    Historico.ret_esc == "i"
).all()
    # Reformatea los resultados para que tengan la forma correcta
    reformateados = [(row.serial, row.cod_men, row.retorno) for row in resultados]

    # Crea un DataFrame a partir de los resultados reformateados
    df = pd.DataFrame(reformateados, columns=['serial', 'cod_men', 'retorno'])

    with tempfile.NamedTemporaryFile(suffix=".xlsx", delete=False) as temp_file:
        # Escribe el DataFrame en un archivo Excel
        df.to_excel(temp_file.name, index=False, sheet_name='Hoja1')

    # Devuelve el archivo Excel para descargar
    return FileResponse(temp_file.name, filename="pendientes.xlsx")

@document_router.get(
        path="/documentos/gestion",
        summary="Descarga un archivo con todos los envíos dentro de las fechas solicitadas formato aaaa.mm.dd",
        dependencies=[Depends(jwtBearer())]
)
def gestion(
    request: Request,
    fecha_inicial: str,
    fecha_final: str,
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

    # Realiza la consulta SQLAlchemy y selecciona solo las columnas deseadas
    fecha_inicial = datetime.strptime(fecha_inicial, '%Y.%m.%d')
    fecha_final = datetime.strptime(fecha_final, '%Y.%m.%d')

    if companyID == 11:
        resultados = db.query(Historico).order_by(Historico.orden.desc()).limit(500000).all() 
    else:
        resultados = db.query(Historico).filter(
        Historico.cod_ent == companyID
    ).order_by(Historico.serial.desc()).limit(500000).all()
    # Reformatea los resultados para que tengan la forma correcta
    reformateados = [(row.serial, row.no_entidad, row.f_emi, row.orden, row.retorno, row.ret_esc, row.motivo) for row in resultados]

    # Crea un DataFrame a partir de los resultados reformateados
    df = pd.DataFrame(reformateados, columns=['serial', 'entidad','fecha_inicio', 'orden', 'retorno', 'ret_esc', 'motivo'])
    df['fecha_inicio'] = pd.to_datetime(df['fecha_inicio'], format='%Y.%m.%d', errors='coerce')
    # Eliminar las horas y los minutos, dejando solo la fecha
    df['fecha_inicio'] = df['fecha_inicio'].dt.date

    # Convierte fecha_inicial y fecha_final a objetos date
    fecha_inicial = fecha_inicial.date()
    fecha_final = fecha_final.date()

    fechasFiltro = (df['fecha_inicio'] >= fecha_inicial) & (df['fecha_inicio'] <= fecha_final)
    df = df[fechasFiltro]

    # Usar numpy.where para asignar valores a la columna 'estado'
    df['estado'] = np.where((df['ret_esc'] == 'E') | (df['retorno'] == 'E'), 'Entrega',
                np.where(df['retorno'] == 'f', 'Envio no ha llegado, faltante',
                np.where(df['retorno'] == 'o', 'Devolucion en proceso',
                np.where(df['retorno'] == 'D', 'Motivo',
                np.where((df['ret_esc'] == 'i') & (df['retorno'].isin(['l', 'j'])), 'Distribución',
                np.where(df['retorno'] == 'i', 'Alistamiento', 'Otro'))))))
    
    df = df[['serial', 'entidad', 'fecha_inicio', 'orden', 'estado']]

    with tempfile.NamedTemporaryFile(suffix=".xlsx", delete=False) as temp_file:
        # Escribe el DataFrame en un archivo Excel
        df.to_excel(temp_file.name, index=False, sheet_name='Hoja1')

    # Devuelve el archivo Excel para descargar
    return FileResponse(temp_file.name, filename="gestion.xlsx")
