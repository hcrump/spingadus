from flask import ( Flask, flash, redirect, render_template,
                    request,url_for, send_from_directory,
                    session,g)
from flask_sqlalchemy import SQLAlchemy
import os
from functools import wraps
# import sqlite3
#from flask_login import login_required,current_user

#blank static_url_path makes static path not show in browser url_for
#must precede any static files with '/' or it breaks
app = Flask(__name__, static_url_path='')

app.config.from_object(os.environ['APP_SETTINGS'])
# app.config.from_object('config.DevelopmentConfig')
# app.config.from_pyfile('config.py')

# create the sqlalchemy object
db = SQLAlchemy(app)
from models import *

# login required decorator
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            flash('You need to login first.')
            return redirect(url_for('login'))
    return wrap


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/welcome')
def welcome():
    return render_template('welcome.html')


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static/media/images'),
                                'favicon.ico',
                                mimetype='image/vnd.microsoft.icon')


@app.route('/login',methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != 'admin' or request.form['password'] != 'admin':
            error = 'Invalid credentials. Please try again.'
        else:
            session['logged_in'] = True
            flash('You were just logged in')
            return redirect(url_for('welcome'))
    return render_template('login.html',error=error)


@app.route('/logout')
def logout():
    session.pop('logged_in',None)
    flash('You were just logged out!')
    return redirect(url_for('login'))


@app.route('/dashboard')
@login_required
def dashboard():
    posts = db.session.query(BlogPost).all()
    return render_template("dashboard.html", posts=posts)


# def connect_db():
#     return sqlite3.connect('posts.db')


@app.route('/upload/')
def upload():
    return 'Hellow World!'


@app.route('/<string:page_name>/')
def render_static(page_name):
    return app.send_static_file(page_name)


@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'),404


if __name__ == '__main__':
    app.run()
