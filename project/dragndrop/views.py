#################
#### imports ####
#################

from project import app
from flask import Blueprint,url_for,redirect,render_template


################
#### config ####
################

dragndrop_blueprint = Blueprint(
    'dragndrop', __name__,
    template_folder='templates'
    # static_url_path='',
    # static_folder='static'
)


##########################
#### helper functions ####
##########################

@dragndrop_blueprint.route('/dragndrop')
def dragndrop():
    # return dragndrop_blueprint.send_static_file('dragndrop.html')
    return render_template('dragndrop.html')

@dragndrop_blueprint.route('/maintestpage')
def maintestpage():
    # return dragndrop_blueprint.send_static_file('dragndrop.html')
    return render_template('hello.html')

@dragndrop_blueprint.route('/dragndrop2')
def dragndrop2():
    # return dragndrop_blueprint.send_static_file('dragndrop.html')
    return render_template('hello.html')
