#################
#### imports ####
#################

from project import app, db
from project.models import BlogPost
from flask import ( request, redirect, flash, render_template, url_for,
                    send_from_directory, Blueprint, current_app)
from flask_login import login_required, current_user
from .form import MessageForm
import os
from collections import OrderedDict
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


@home_blueprint.route('/dashboard', methods=['GET','POST'])
@login_required
def dashboard():
    error = None
    form = MessageForm(request.form)
    if form.validate_on_submit():
        new_message = BlogPost(
            form.title.data,
            form.description.data,
            current_user.id
        )
        db.session.add(new_message)
        db.session.commit()
        flash('New entry was successfully posted. Thanks.')
        return redirect(url_for('home.dashboard'))
    else:
        posts = db.session.query(BlogPost).all()
        return render_template("dashboard.html", posts=posts, error=error, form=form)

# only for direct sql to sqlite3, but we are using sqlalchemy
# def connect_db():
#     return sqlite3.connect(app.database)


@home_blueprint.route('/blog')
def blog():
    posts = db.session.query(BlogPost).all()
    return render_template('blog.html', posts=posts)

@home_blueprint.route('/pictures')
def pictures():
    static_dir = app.config['STATIC_ROOT']
    pic_dir = 'media/images/pictures'
    path = os.path.join(static_dir,'media','images','pictures')
    pic_dict = {}
    # pic_dict.setdefault('zz',None)
    # print(path)
    for folder in os.listdir(path):
        if os.path.isdir(os.path.join(path,folder)):
            print(folder)
            pic_dict.setdefault(folder,[])
            # pic_dict.setdefault(folder,"")
            for subfolder in os.listdir(os.path.join(path,folder)):
                print('----'+subfolder)
                pic_dict[folder].append(subfolder)
    sorted_dict = OrderedDict(reversed(sorted(pic_dict.items())))
    return render_template('pictures.html',pic_dict=sorted_dict)

@home_blueprint.route('/contact')
def contact():
    return render_template('contact.html')

@home_blueprint.route('/about')
def about():
    return render_template('about.html')

# @home_blueprint.route('/<string:page_name>/')
# def render_static(page_name):
#     return app.send_static_file(page_name)


# @home_blueprint.errorhandler(404)
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'),404
