import os
from flask import Flask
from flask_bcrypt import Bcrypt
from app.db.db import initialize_db
from app.db.models import User
from app.resourses.order import orders
from app.resourses.user import users
from app.resourses.admin import admin
from app.resourses.statistics import statistics
from flask_jwt_extended import JWTManager

app = Flask (__name__)
app.config['JWT_SECRET_KEY']= 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

app.url_map.strict_slashes = False

app.config['MONGODB_SETTINGS'] = {
    'name' : 'name',
    'host' : 'mongodb',
    'port' : 27017
}
app.config["SECRET_KEY"] = "SECRET_KEY"


db = initialize_db(app)

app.register_blueprint(orders)
app.register_blueprint(users)
app.register_blueprint(admin)
app.register_blueprint(statistics)

@app.route('/')
def check_flask():
    return "Flask is ok"


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:8080')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response



if __name__ == '__main__':
    app.run ()
