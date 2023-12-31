from sqlalchemy import Column, String
from app.database.connection import Base


class Historico(Base):
    __tablename__ = "histo"
    serial = Column(String(255), primary_key=True)
    no_entidad = Column(String(255))
    barrd1 = Column(String(255))
    barrd2 = Column(String(255))
    cedula = Column(String(255))
    ciudad1 = Column(String(255))
    ciudad2 = Column(String(255))
    cod_esc = Column(String(255))
    cod_men = Column(String(255))
    cod_mot = Column(String(255))
    cod_sec = Column(String(255))
    comentario = Column(String(255))
    costado = Column(String(255))
    dir_num = Column(String(255))
    dir_pred = Column(String(255))
    dirdes1 = Column(String(255))
    dirdes2 = Column(String(255))
    dpto1 = Column(String(255))
    dpto2 = Column(String(255))
    empresa = Column(String(255))
    f_cor = Column(String(255))
    f_emi = Column(String(255))
    f_esc = Column(String(255))
    f_grab = Column(String(255))
    f_lleva = Column(String(255))
    f_rad = Column(String(255))
    f_ret = Column(String(255))
    f_ven = Column(String(255))
    h_emi = Column(String(255))
    h_grab = Column(String(255))
    h_lleva = Column(String(255))
    identdes = Column(String(255))
    imagen = Column(String(255))
    lot_esc = Column(String(255))
    lote = Column(String(255))
    mot_esc = Column(String(255))
    mot_esp = Column(String(255))
    motivo = Column(String(255))
    nombred = Column(String(255))
    nro_imp_g = Column(String(255))
    oficina = Column(String(255))
    orden = Column(String(255))
    planilla = Column(String(255))
    ret_esc = Column(String(255))
    retorno = Column(String(255))
    secuencia = Column(String(255))
    servicio = Column(String(255))
    usuario = Column(String(255))
    valor = Column(String(255))
    cod_ent = Column(String(255))
