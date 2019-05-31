#################
#### imports ####
#################

from flask import ( Flask, flash, redirect, render_template, request,
                    url_for, send_from_directory,session,g,Blueprint)
from functools import wraps
from .form import LoginForm
from project.models import User, bcrypt
################
#### config ####
################

users_blueprint = Blueprint(
    'users', __name__,
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
            return redirect(url_for('login'))
    return wrap

################
#### routes ####
################

@users_blueprint.route('/login',methods=['GET', 'POST'])
def login():
    error = None
    form = LoginForm(request.form)
    if request.method == 'POST':
        if form.validate_on_submit():
            user = User.query.filter_by(name=request.form['username']).first()
            if user is not None and bcrypt.check_password_hash(user.password, request.form['password']):
                session['logged_in'] = True
                flash('You were just logged in')
                return redirect(url_for('home.dashboard'))
            else:
                error = 'Invalid credentials. Please try again.'
    return render_template('login.html',form=form, error=error)


@users_blueprint.route('/logout')
def logout():
    session.pop('logged_in',None)
    flash('You were logged out!')
    return redirect(url_for('home.welcome'))
