#################
#### imports ####
#################

from project import app
from flask import Blueprint,url_for,redirect,render_template,request,current_app,Markup
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
@dragndrop_blueprint.route('/dragndrop')
def dragndrop_greeting():
    return render_template('dragndrop_greeting.html')

@dragndrop_blueprint.route('/<string:page_name>')
# @dragndrop_blueprint.route('/dragndrop')
def dragndrop(page_name):
    folder = page_name
    json_dir = app.config['JSON_DIR']
    links = []
    json_files = [file for file in os.listdir(os.path.join(json_dir,folder))
                if file.endswith(".json")]
    print(json_files)

    link = ""
    for file in json_files:
        file_no_ext = file.split(".")[0]
        # link = '"#" onclick="mainStartScript('buh');return false;">COMPTIA NETWORK')
        a = '<a href="#" onclick="mainStartScript('
        b = "'" + page_name + '/' + file
        c = '\');return false;">'
        d = file_no_ext.upper()
        e = '</a>';
        link  = Markup(a + b + c + d + e)
        print(link)
        links.append(link)

    if not links:
        links.append('No Files Sorry!')

    return render_template('dragndrop.html',links=links)






######################################
#### Old but i'm afraid to delete ####
######################################
# @dragndrop_blueprint.route('/<string:page_name>')
# def dragndrop(page_name):
#     print('-----------------', page_name, '----------------------')
#     # app.logger.debug('A value for debugging')
#     # print(app.config['JSON_LINKS'])
#     if page_name in app.config['JSON_LINKS']:
#         return render_template('dragndrop.html',title=page_name)
#     else:
#         return render_template('404.html')

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
