#################
#### imports ####
#################

from project import app
from flask import Blueprint,url_for,redirect,render_template,request,current_app
import os
import json

################
#### config ####
################

api_blueprint = Blueprint(
    'api', __name__,
    template_folder='templates'
    # static_url_path='',
    # static_folder='static'
)

################
#### routes ####
################

@api_blueprint.route('/api/<name>')
def api_get_name(name):
    return json.jsonify({
        'name': name
    })
