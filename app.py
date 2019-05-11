from flask import ( Flask,
                    flash,
                    redirect,
                    render_template,
                    request,url_for,
                    send_from_directory)
from flask_login import login_required,current_user
import os

#blank static_url_path makes static path not show in browser url_for
#must precede any static files with '/' or it breaks
app = Flask(__name__,
            instance_relative_config=True,
            static_url_path='')

app.config.from_object('config')
app.config.from_pyfile('config.py')


@app.route('/<string:page_name>/')
def render_static(page_name):
    return app.send_static_file(page_name)

@app.route('/')
def index():
    return app.send_static_file('static-screen.html')

@app.route('/dashboard')
@login_required
def account():
    return render_template("account.html")

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                                'favicon.ico',
                                mimetype='image/vnd.microsoft.icon')
@app.route('/upload/')
def upload():
    return 'Hellow World!'

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'),404

if __name__ == '__main__':
    app.run()
