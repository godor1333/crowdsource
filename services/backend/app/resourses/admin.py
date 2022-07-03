from flask import Flask, request, Response, Blueprint,send_file
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime
import json
from app.db.models import User,Order

admin = Blueprint('admin', __name__)

@admin.route('/admin/import',methods=['POST'])
@jwt_required
def post_users():
	user_id = get_jwt_identity()
	if user_id == "admin":
		file = request.files['file']
		file.save('import.json')
		with open("import.json", "r") as read_file:
			file = json.load(read_file)
		if file:
			data = file
			for order in data["orders"]:
				id = order["_id"]["$oid"]
				order.pop("_id", None)
				orders = Order(**order,id=id)
				orders.save()
			for user in data["users"]:
				id = user["_id"]["$oid"]
				user.pop("_id", None)
				users = User(**user,id=id)
				users.save() 	 
		return '', 200
	return {"msg":"log in as admin"},401

@admin.route('/admin/export',methods=['GET'])
@jwt_required
def get_orders():
	user_id = get_jwt_identity()
	if user_id == "admin":
		orders = Order.objects().to_json()
		users = User.objects().to_json()

		dump_db ={"orders":json.loads(Order.objects().to_json()),"users":json.loads(User.objects().to_json())} 	
		with open("app/dump.json", "w") as write_file:
			json.dump(dump_db, write_file)
		Order.objects().delete()
		User.objects().delete()
		return send_file("dump.json", mimetype="text/javascript")
	return {"msg":"log in as admin"},401