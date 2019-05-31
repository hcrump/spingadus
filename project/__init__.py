#################
#### imports ####
#################

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import os

################
#### config ####
################

#blank static_url_path makes static path not show in browser url_for
#must precede any static files with '/' or it breaks
app = Flask(__name__, static_url_path='')
bcrypt = Bcrypt(app)
app.config.from_object(os.environ['APP_SETTINGS'])
db = SQLAlchemy(app)

from project.users.views import users_blueprint
from project.home.views import home_blueprint

# register blueprints
app.register_blueprint(users_blueprint)
app.register_blueprint(home_blueprint)
