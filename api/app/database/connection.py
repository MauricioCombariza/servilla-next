from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.settings.settings import db_host, db_name, db_user, db_pass, db_port

DATABASE_URL = "mysql+mysqlconnector://{}:{}@{}:{}/{}".format(
    db_user, db_pass, db_host, db_port, db_name)


engine = create_engine(DATABASE_URL)


def conn():
    return engine.connect()


metadata = MetaData()

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)



def get_session():
    try:
        session = SessionLocal()
        yield session
    finally:
        session.close()

def get_df():
    try:
        session = SessionLocal()
        yield session
    finally:
        session.close()


Base = declarative_base()
