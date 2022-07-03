from flask import Flask, request, Response, Blueprint, send_from_directory
from app.db.models import Order, User
from flask_jwt_extended import jwt_required, get_jwt_identity
import datetime
import json
import os

orders = Blueprint('orders', __name__)

def update_res(dict_json,dict_bd):
    dict_json = dict(dict_json)
    dict_bd = json.loads(dict_bd)
    for data_counter in dict_json["data"]:
        for res in dict_json["data"][data_counter]:
            dict_bd["data"][data_counter][res]=dict_bd["data"][data_counter][res]+dict_json["data"][data_counter][res]
    return dict_bd

def check_passed(user,order_id):
    dict_us = json.loads(user)
    for status in dict_us["orders_status"]:
        st = status.get(order_id)
        if st == "deleted" or st == "ended":
            return False
    return True

def check_started(user,order_id):
    dict_us = json.loads(user)
    for status in dict_us["orders_status"]:
        st = status.get(order_id)
        if st == "deleted" or st == "ended" or st == "started":
            return False
    return True

@orders.route('/orders', methods=['GET'])
def get_orders():
    #TODO give data without res
    orders = Order.objects().to_json()
    return Response(orders, mimetype="application/json", status=200)


@orders.route('/orders', methods=['POST'])
@jwt_required
def add_order():
    user_id = get_jwt_identity()
    body = request.get_json()
    user = User.objects.get(id=user_id)
    order = Order(**body,author = user_id,dateCreate=datetime.date.today().strftime("%m-%d-%Y"),customer=user.customer)
    order.save()
    user.update(push__orders_status={str(order.id):"posted"})
    id = order.id
    return {'id': str(id)}, 200

@orders.route('/orders/<id>/upload_images', methods=['POST'])
@jwt_required
def upload_images(id):
    user_id = get_jwt_identity()
    order= Order.objects().get(id=id)
    if user_id != order.author:
        return {"msg":"it isnt your acc"},401
    images = request.files
    path = "../uploads/"+str(id)
    os.mkdir(path)
    for image in images:
        file_name = images[image].filename
        images[image].save(path+"/"+file_name)
    return '', 200


@orders.route('/download/<id>/<filename>')
@jwt_required
def uploaded_file(id, filename):
    return send_from_directory("../uploads/"+str(id),filename)

@orders.route('/orders/<id>', methods=['PUT'])
@jwt_required
def update_order(id):
    user_id = get_jwt_identity()
    body = request.get_json()
    order = Order.objects.get(id=id)
    user = User.objects.get(id = user_id)
    if order.author == user_id:
        order.update(**body)
    else:
        if check_passed(user.to_json(),str(order.id)):
            body = update_res(body,order.to_json())
            order.update(data=body["data"],counter_of_ended = order.counter_of_ended+1)
            user.update(pull__orders_status= {str(order.id):"started"})
            user.update(push__orders_status= {str(order.id):"ended"})
    return '', 200

@orders.route('/orders/<id>', methods=['DELETE'])
@jwt_required
def delete_order(id):
    user_id = get_jwt_identity()
    order = Order.objects.get(id=id)
    user = User.objects.get(id=user_id)
    if order.author == user_id:
        order.delete()
        user.update(pull__orders_status= {str(order.id):"posted"})
    else:
        user.update(pull__orders_status= {str(order.id):"ended"})
        user.update(pull__orders_status= {str(order.id):"started"})
        user.update(push__orders_status= {str(order.id):"deleted"})
    return '',200


@orders.route('/orders/<id>',methods=['GET'])
@jwt_required
def get_order(id):
    user_id = get_jwt_identity()
    order = Order.objects.get(id=id)
    user = User.objects.get(id = user_id)
    if order.author == user_id:
        order= order.to_json()
        return Response(order, mimetype="application/json", status=200)
    else:
        if check_started(user.to_json(),str(order.id)):
            order.update(counter_of_started = order.counter_of_started+1)
            user.update(push__orders_status={str(order.id):"started"})
        #TODO give data without res
        order=order.to_json()
        return Response(order, mimetype="application/json", status=200)
