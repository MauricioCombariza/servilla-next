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
    path="/nombre/{name}",
    summary="Muestra los resultados de un nombre buscado"
)
async def get_name(
    name: str = Path(
        ...,
        description="Ingrese el nombre de la persona que desea buscar",
        example="Mauricio Combariza"
    ),
    db: Session = Depends(get_session),
    limit: int = 10
):
    """
    Base de datos de Servilla

    Muestra todos los registros de un nombre específico 

    Requerimientos:
        -

    """
    # name = db.query(Historico).filter(
    #     Historico.nombred == name).limit(limit).all()
    # return name

    name = db.query(Historico).filter(Historico.nombred.like(f'%{name}%')).limit(limit).all()
    return name
    # result = session.query(Customers).filter(Customers.name.like('Ra%'))

@event_router.get(
    path="/imagen/{orden}",
    summary="Trae todas las imagenes de una orden pedida",
    # dependencies=[Depends(jwtBearer())]
)
async def get_image(

    orden: str = Path(
        ...,
        description="Ingrese el numero de orden del cual quiera exportar sus imagenes",
        example="118895"
    ),
    db: Session = Depends(get_session)):
    
    data = 'SELECT * FROM histo  WHERE orden={}'.format(orden)
    
    

    if data:
        df = pd.read_sql(data, engine)
        # df.to_csv('/mnt/c/Imagenes/imagenes.csv', header=True, index=None, sep=',', mode='a')
        # return {'Message:', "Successfull pandas"}
        df = df[['serial', 'orden', 'f_esc', 'mot_esc', 'lot_esc', 'imagen']]
        df['imagen'] = df['imagen'].astype(str)
        df['lot_esc'] = df['lot_esc'].astype(str)
        orden = []
        serial = []
        for i in range(len(df)-1):
            if df.iloc[i, 4] != '':
                s = df.iloc[i, 2]
                for c in s:
                    if c == '.':
                        s = s.replace(c, "")
                x = r'V:\TRAB\{}\{}\{}.tif'.format(s,df.iloc[i,4], df.iloc[i,5])        
                # x = Path('V:', '/', 'TRAB', s, df.iloc[i,4], df.iloc[i,5] + ".tif")
                y = r"C:\Imagenes\Orden\{}.png".format(df.iloc[i,0][:16])
                # y = Path('C', '/'\, 'Imagenes', 'orden', df.iloc[i,0][:16] + ".png")
                # print(x)
                # a = os.chdir(x)
                # b = os.chdir(y)
                # shutil.copyfile(x,y)
                orden.append(x)
                serial.append(y)
        r = pd.DataFrame(orden, columns =['ruta'])
        s = pd.DataFrame(serial, columns =['destino'])
        result = pd.concat([r, s], axis=1)
        result.to_csv('/mnt/c/Imagenes/imagenes.csv', header=True, index=None, sep=',', mode='a')
        
        return {'Message:', "Successfull pandas"}
         
    else:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    

# @event_router.post(
#     path="/envios/",
#     summary="Trae todas los envios de los courrier a nivel nacional",
    # dependencies=[Depends(jwtBearer())]
# )
# async def get_enviosCourrier(
#     db: Session = Depends(get_session),
#     fechaInicio: str = Form(
#         ...,
#         title="Fecha inicio",
#         description="Ingrese la fecha desde la cual quiere ver los envios [yyyy-mm-dd]",
#         example="2023-03-01"),
#     fechaFin: str = Form(
#         ...,
#         title="Fecha final",
#         description="Ingrese la fecha hasta la cual quiere ver los envios [yyyy-mm-dd]",
#         example="2023-03-31"
#     ),
#     servicio: int = Form (
#         ...,
#         title="Numero del servicio del que desea el reporte",
#         description="Numero de servicio",
#         example=1010
#     ),
#     informe: int = Form(
#         ...,
#         title="Tipo de informe",
#         description="Informe consolidado [1], por courrier [2]"
#     )

# ) -> dict:
#     df = pd.read_csv('/mnt/c/Users/mcomb/OneDrive/Escritorio/Carvajal/python/basesHisto.csv', low_memory=False)
#     # data = 'SELECT * FROM histo'
#     if df:
#         # df = pd.read_sql(data, engine)
#         # df = pd.read_csv('./basesHisto.csv', low_memory=False)
#         format1 = '%Y.%m.%d'
#         dfC = df.copy()
#         dfC = dfC[['serial','no_entidad','servicio', 'orden','nombred', 'dirdes1', 'ciudad1', 'cod_sec',  'retorno','ret_esc',  'planilla',
#                 'f_emi', 'f_lleva', 'cod_men', 'dir_num', 'comentario',  'identdes']]
#         Planilla = dfC['planilla'].notnull()
#         dfC = dfC[Planilla]
#         # dfC['cod_men'] = pd.to_numeric(dfC['cod_men'], errors='coerce').fillna(0).astype(np.int64)
#         # MEN = dfC['cod_men'] > 729
#         # dfC = dfC[MEN]
#         SERVICIO = dfC['servicio'] == servicio
#         dfC['fecha'] = dfC.apply(lambda x: datetime.strptime(x['f_emi'], format1).date(), axis=1)
#         start_date = pd.to_datetime(fechaInicio).date()
#         end_date = pd.to_datetime(fechaFin).date()
#         INICIO = dfC['fecha'] > start_date
#         FIN = dfC['fecha'] < end_date
#         PEN = dfC['ret_esc'] == 'i'
#         LLEV = dfC['ret_esc'] == 'p'
#         RETL = dfC['retorno'] == 'l'
#         RETP = dfC['retorno'] == 'p'
#         dfC = dfC[SERVICIO]
#         dfC = dfC[INICIO]
#         dfC = dfC[((PEN | LLEV))]
#         dfC = dfC[(RETL | RETP)]
#         courriers = dfC['cod_men'].unique()
#         if informe == 2:
#             for i in range(len(courriers)):
#                 for j in range(len(dfC)):
#                     options = [courriers[i]]
#                     rslt_df = dfC[dfC['cod_men'].isin(options)]
#                 libro = '/mnt/c/Users/mcomb/OneDrive/Escritorio/Carvajal/python/courrier/pendientes/' + str(courriers[i]) + 'servicio_' + str(servicio) + 'long'+str(len(rslt_df)) + '.xlsx'
#                 rslt_df.iloc[:, 0:8].to_excel(libro, index=None)
#         else:
#             libro = '/mnt/c/Users/mcomb/OneDrive/Escritorio/Carvajal/python/courrier/pendientes/' + 'consolidado ' + 'servicio_' + str(servicio) + 'long'+str(len(dfC)) + '.xlsx'
#             dfC.iloc[:, 0:8].to_excel(libro, index=None)        
#     else:
#         raise HTTPException(status_code=404, detail="Problemas en el servidor")

# static_folder = "./static/pendientes"  # Ruta de la carpeta de archivos estáticos

# static_files = StaticFiles(directory=static_folder)
# event_router.mount("/static", static_files)

# @event_router.post(
#     path="/pendientes/mensajero",
#     summary="Trae todos los pendientes de los mensajeros de todos los clientes",
    # dependencies=[Depends(jwtBearer())]
# )
# async def get_pendientesMensajeros(
#     db: Session = Depends(get_session),
#     mensajero: str = Form(
#         ...,
#         title="Mensajero",
#         description="Ingrese el número del código del mensajero del cual desea sus pendientes",
#         example="30"),
#  ):
#     directorio_destino = "/mnt/c/Users/mcomb/OneDrive/Escritorio/Pendientes"
#     # directorio_destino = "./static/pendientes/"
#     if not os.path.exists(directorio_destino):
#         os.makedirs(directorio_destino) 
#     registros_filtrados = db.query(Historico).filter(Historico.cod_men == mensajero).all()
#     datos = {
#         "serial": [registro.serial for registro in registros_filtrados],
#         "retorno": [registro.retorno for registro in registros_filtrados],
#         "ret_esc": [registro.ret_esc for registro in registros_filtrados],
#         "orden": [registro.orden for registro in registros_filtrados],
#         "planilla": [registro.planilla for registro in registros_filtrados],
#         "fecha_emision": [registro.f_emi for registro in registros_filtrados],
#         "fecha_lleva": [registro.f_lleva for registro in registros_filtrados],
#         "sector": [registro.cod_sec for registro in registros_filtrados],
#         "compañia": [registro.no_entidad for registro in registros_filtrados],
#         "nombre": [registro.nombred for registro in registros_filtrados],
#         "direccion": [registro.dirdes1 for registro in registros_filtrados],
#     }
#     if datos:
#         df = pd.DataFrame(datos)        
#         lleva = df['retorno'] == 'l'
#         escI = df['ret_esc'] == 'i'
#         df = df[lleva & escI]
#         archivo = 'pendientes.csv'
#         # archivo = 'pendientes_'+ str(mensajero) + '.csv'
#         ruta_archivo = os.path.join(directorio_destino, archivo)
#         df.to_csv(ruta_archivo)
        
#         # df.to_excel(('/mnt/c/Users/mcomb/OneDrive/Escritorio/Carvajal/python/pendientes/{}').format(archivo))
#         return FileResponse(ruta_archivo, filename=archivo)
#     else:
#         raise HTTPException(status_code=404, detail="Problemas en el servidor")


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
from fastapi import Request


@event_router.get(
    path="/test/{serial}",
    summary="Muestra el serial indicado",
    dependencies=[Depends(jwtBearer())]
)
async def get_serial_test(
    request: Request,
    serial: str = Path(
        ...,
        description="Ingrese el numero serial que desea consultar",
        example="2208092647004648"
    ),
    db: Session = Depends(get_session)
):
    # Obtén el encabezado Authorization del Request
    authorization = request.headers.get("Authorization")

    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Esquema de autenticación inválido"
        )

    # Extrae el token sin el prefijo "Bearer"
    token = authorization.split(" ")[1]

    # Imprime el token
    print(f"Token JWT: {token}")

    # Decodifica el token y obtén el payload
    payload = decodeJWT(token)

    companyID = payload['companyID']

    # Imprime el payload
    print(f"Payload del payload: {payload}")
    print(f"Payload del company: {companyID}")

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

