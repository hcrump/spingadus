import os

# default config
class BaseConfig(object):
    DEBUG = False
    SECRET_KEY = '\xd9c\xf76\x93\n\xa5\x89\xccs]3\x85A$C\xe9\r\x87\xfaShx2'
    SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']

# development config
class DevelopmentConfig(BaseConfig):
    DEBUG = True
# production config just in case
class ProductionConfig(BaseConfig):
    DEBUG = False
