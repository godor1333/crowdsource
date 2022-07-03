from .db import db
from flask_bcrypt import generate_password_hash, check_password_hash

class User(db.Document):
    email = db.StringField(required = True, max_length=255,unique=True)
    name = db.StringField(required = True, max_length=255)
    surname = db.StringField(max_length=255)
    password = db.StringField(required = True, max_length=255)
    type = db.StringField(required = True, max_length=255)
    orders_status = db.ListField(db.DictField(), default=[])
    customer = db.StringField( max_length=255)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

class Order(db.Document):
    author = db.StringField()
    title = db.StringField()
    description = db.StringField()
    dateCreate = db.StringField()
    counter_of_ended = db.IntField(default = 0)
    counter_of_started = db.IntField(default = 0)
    customer = db.StringField( max_length=255)
    data_type = db.StringField()
    data = db.DictField(db.DictField(), default={})

