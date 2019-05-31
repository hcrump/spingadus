import os

# default config
class BaseConfig(object):
    DEBUG = False
    SECRET_KEY = '\xd9c\xf76\x93\n\xa5\x89\xccs]3\x85A$C\xe9\r\x87\xfaShx2'
    # SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL'] didn't work for some reason quotes maybe?
    SQLALCHEMY_DATABASE_URI = 'sqlite:///posts.db'

# development config
class DevelopmentConfig(BaseConfig):
    DEBUG = True
# production config just in case
class ProductionConfig(BaseConfig):
    DEBUG = False

class TestConfig(BaseConfig):
    DEBUG = True
    TESTING = True
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
