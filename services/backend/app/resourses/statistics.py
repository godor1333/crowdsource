from flask import Flask, request, Response, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.db.models import User, Order
import json

statistics = Blueprint('statistics', __name__)

@statistics.route('/orders/<id>/statistics',methods=['GET'])
@jwt_required
def get_data_statistics(id):
	user_id = get_jwt_identity()
	order = Order.objects.get(id=id)
	if order.author == user_id:
		body = json.loads(order.to_json())
		res = {}
		for data_counter in body["data"]:
			for	res_counter in body["data"][data_counter]:
				if res.get(res_counter):
					res[res_counter]+=body["data"][data_counter][res_counter]
				else:
					res[res_counter]= 0 + body["data"][data_counter][res_counter]
		res = json.dumps(res)
		return Response(res, mimetype="application/json", status=200)
	return {"msg":"it isnt your order"}

@statistics.route('/orders/<id>/user_statistics',methods=['GET'])
@jwt_required
def get_user_statistics(id):
	user_id = get_jwt_identity()
	order = Order.objects.get(id=id)
	if order.author == user_id:
		res = {}
		res["ended"] = order.counter_of_ended
		res["started"] = order.counter_of_started
		res = json.dumps(res)
		return Response(res, mimetype="application/json", status=200)
	return {"msg":"it isnt your order"}