#################
#### imports ####
#################

from project import app, db
from project.models import BlogPost
from flask import ( Flask, flash, redirect, render_template, request,
                    url_for, send_from_directory,session,g, Blueprint)
from functools import wraps
import os

################
#### config ####
################

home_blueprint = Blueprint(
    'home', __name__,
    template_folder='templates'
)

##########################
#### helper functions ####
##########################


# login required decorator
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash('You need to login first.')
            return redirect(url_for('users.login'))
    return wrap


@home_blueprint.route('/')
def index():
    return app.send_static_file('index.html')


@home_blueprint.route('/welcome')
def welcome():
    return render_template('welcome.html')


@home_blueprint.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static/media/images'),
                                'favicon.ico',
                                mimetype='image/vnd.microsoft.icon')


# @app.route('/login',methods=['GET', 'POST'])
# def login():
#     error = None
#     if request.method == 'POST':
#         if request.form['username'] != 'admin' or request.form['password'] != 'admin':
#             error = 'Invalid credentials. Please try again.'
#         else:
#             session['logged_in'] = True
#             flash('You were just logged in')
#             return redirect(url_for('dashboard'))
#     return render_template('login.html',error=error)
#
#
# @app.route('/logout')
# def logout():
#     session.pop('logged_in',None)
#     flash('You were just logged out!')
#     return redirect(url_for('login'))


@home_blueprint.route('/dashboard')
@login_required
def dashboard():
    posts = db.session.query(BlogPost).all()
    return render_template("dashboard.html", posts=posts)

# def connect_db():
#     return sqlite3.connect(app.database)

@home_blueprint.route('/upload/')
def upload():
    return 'Hellow World!'


@home_blueprint.route('/<string:page_name>/')
def render_static(page_name):
    return app.send_static_file(page_name)


@home_blueprint.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'),404
