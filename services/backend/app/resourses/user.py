from flask import Flask, request, Response, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime
from app.db.models import User,Order
import json

users = Blueprint('users', __name__)

@users.route('/signup', methods=['POST'])
def registration():
    body = request.get_json()
    user = User(**body)
    user.hash_password()
    user.save()
    id = user.id
    return {'id': str(id)}, 200

@users.route('/login',methods=['POST'])
def login():
    try:
        body = request.get_json()
        if body.get('email')=='admin@mail.ru' and body.get('password')=='admin':
            expires = datetime.timedelta(days=1)
            access_token = create_access_token(identity="admin", expires_delta=expires)
            return {'token': access_token, 'user_id': 'admin'}, 200
        user = User.objects.get(email=body.get('email'))
        authorized = user.check_password(body.get('password'))
        if not authorized:
            return {'error': 'Email or password invalid'}, 401
        expires = datetime.timedelta(days=1)
        access_token = create_access_token(identity=str(user.id), expires_delta=expires)   
        return {'token': access_token, 'user_id': str(user.id)}, 200
    except Exception as e:
        return {'error': 'Email or password invalid'}, 401

@users.route('/<id>',methods=['GET'])
@jwt_required
def get_user(id):
    user_id = get_jwt_identity()
    if user_id == id:
        user = User.objects.get(id=id).to_json()
        return Response(user, mimetype="application/json", status=200)
    return {"msg":"it isnt your acc"},401

@users.route('/<id>',methods=['PUT'])
@jwt_required
def update_user(id):
    user_id = get_jwt_identity()
    body = request.get_json()
    if user_id == id:
        user = User.objects.get(id=id)
        user.update(**body)
        return '', 200
    return {"msg":"it isnt your acc"},401

@users.route('/<id>/orders',methods=['GET'])
@jwt_required
def get_orders(id):
    user_id = get_jwt_identity()
    if user_id == id:
        user = User.objects.get(id = id).to_json()
        dict_user = json.loads(user)
        dict_of_orders = {}
        counter = 0
        for status in dict_user["orders_status"]:
            for key in status:
                st = status.get(key)
                if st == "started" or st == "posted" or st == "ended":
                    dict_of_orders[counter] = json.loads(Order.objects.get(id= key).to_json())
                    counter += 1
        json_of_orders = json.dumps(dict_of_orders)
        return Response(json_of_orders, mimetype="application/json", status=200)
    else:
        return '', 401