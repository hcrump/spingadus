from flask import ( Flask, flash, redirect, render_template,
                    request,url_for, send_from_directory,
                    session,g)
#from flask_login import login_required,current_user
import os
from functools import wraps
import sqlite3

#blank static_url_path makes static path not show in browser url_for
#must precede any static files with '/' or it breaks
app = Flask(__name__,
            instance_relative_config=True,
            static_url_path='')

app.secret_key = "my precious"
app.config.from_object('config')
app.config.from_pyfile('config.py')
app.database = "sample.db"

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

@app.route('/dashboard')
@login_required
def dashboard():
    flash('wtf!!!')
    g.db = connect_db()
    cur = g.db.execute('select * from posts')
    posts = []
    for row in cur.fetchall():
        posts.append(dict(title=row[0],description=row[1]))

    # posts = [dict(title=row[0], description=row[1]) for row in cur.fetchall()]

    g.db.close()
    return render_template("dashboard.html", posts=posts)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static/media/images'),
                                'favicon.ico',
                                mimetype='image/vnd.microsoft.icon')
@app.route('/login/',methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != 'admin' or request.form['password'] != 'admin':
            error = 'Invalid credentials. Please try again.'
        else:
            session['logged_in'] = True
            flash('You were just logged in')
            return redirect(url_for('index'))
    return render_template('login.html',error=error)

@app.route('/logout/')
def logout():
    session.pop('logged_in',None)
    flash('You were just logged out!')
    return redirect(url_for('index'))

def connect_db():
    return sqlite3.connect(app.database)

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
