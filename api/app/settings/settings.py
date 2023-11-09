from decouple import config
# from pydantic import BaseSettings
from pydantic_settings import BaseSettings


db_host = config('DB_HOST')
db_name = config('DB_NAME')
db_user = config('DB_USER')
db_pass = config('DB_PASS')
db_host = config('DB_HOST')
db_port = config('DB_PORT')

# secret_key: str = config('SECRET_KEY')
# token_expire: int = config('ACCESS_TOKEN_EXPIRE_MINUTES')

# JWT_SECRET = config("secret")
