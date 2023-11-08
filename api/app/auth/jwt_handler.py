# Esta linea es responsable por signing, encoding, decoding and returning jwt.
import time
import jwt
from decouple import config
from fastapi import HTTPException


JWT_SECRET = config("SECRET_KEY")
# JWT_ALGORITHM = config("ALGORITHM")
JWT_ALGORITHM = "HS256"

# JWT_ALGORITHM = "H256"
EXPIRY_TIME = config("ACCESS_TOKEN_EXPIRE_MINUTES")


# Esta función retorna los tokens generados
def token_response(token: str):
    return {
        "access token": token
    }

# Esta función firma los tokens


def signJWT(email: str, perfil: int, username: str, company:int):
    payload = {
        "userID": email,
        "perfilID": perfil,
        "username": username,
        "companyID": company,
        "expiry": time.time() + 2500
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token_response(token)

# Decode function debe devolver informacion teniendo el token

def decodeJWT(token):
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='Signature has expired')
        except jwt.InvalidTokenError as e:
            print('Error: ', e)
            raise HTTPException(status_code=401, detail='Invalid token')
