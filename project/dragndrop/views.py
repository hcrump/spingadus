#################
#### imports ####
#################

from project import app
from flask import Blueprint,url_for,redirect,render_template,request,current_app
import os

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

def get_json_dirs():
    pass

################
#### routes ####
################
@dragndrop_blueprint.route('/<string:page_name>')
def dragndrop(page_name):
    print('-----------------', page_name, '----------------------')
    # app.logger.debug('A value for debugging')
    # print(app.config['JSON_LINKS'])
    if page_name in app.config['JSON_LINKS']:
        return render_template('dragndrop.html',title=page_name)
    else:
        return render_template('404.html')

# @dragndrop_blueprint.route('/dragndrop')
# def dragndrop():
#     return render_template('dragndrop.html')
#
# @dragndrop_blueprint.route('/certification')
# def certification():
#     title = request.url_rule
#     return render_template('dragndrop.html', title=title)
#
# @dragndrop_blueprint.route('/japanese')
# def japanese():
#     return render_template('hello.html')
#
# @dragndrop_blueprint.route('/kids')
# def maintestpage():
#     return dragndrop_blueprint.send_static_file('maintestpage.html')
#
# @dragndrop_blueprint.route('/testing')
# def dragndrop2():
#     return render_template('hello.html')
