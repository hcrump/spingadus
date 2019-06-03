#################
#### imports ####
#################

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
import os

################
#### config ####
################

#blank static_url_path makes static path not show in browser url_for
#must precede any static files with '/' or it breaks
app = Flask(__name__, static_url_path='')
# app = Flask(__name__,static_folder='static')
bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)
app.config.from_object(os.environ['APP_SETTINGS'])
db = SQLAlchemy(app)

from project.users.views import users_blueprint
from project.home.views import home_blueprint
from project.dragndrop.views import dragndrop_blueprint

# register blueprints
app.register_blueprint(users_blueprint)
app.register_blueprint(home_blueprint)
app.register_blueprint(dragndrop_blueprint)

from project.models import User

login_manager.login_view = "users.login"

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter(User.id == int(user_id)).first()