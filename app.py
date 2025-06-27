# from flask import Flask, request, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# users = []
# tuktuks = []
# VERIFICATION_CODE = "1234"

# @app.route('/register', methods=['POST'])
# def register():
#     data = request.get_json()
#     first_name = data.get('firstName')
#     last_name = data.get('lastName')
#     phone = data.get('phone')
#     email = data.get('email')
#     password = data.get('password')

#     if not all([first_name, last_name, phone, email, password]):
#         return jsonify({"status": "fail", "message": "يرجى ملء جميع الحقول"}), 400

#     for user in users:
#         if user["email"] == email:
#             return jsonify({"status": "fail", "message": "هذا البريد مستخدم بالفعل"}), 400

#     users.append({
#         "email": email,
#         "password": password
#     })

#     return jsonify({
#         "status": "success",
#         "message": f"تم إنشاء الحساب بنجاح، مرحبًا {first_name}!"
#     })

# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')

#     for user in users:
#         if user["email"] == email and user["password"] == password:
#             return jsonify({"status": "success", "message": "تم تسجيل الدخول بنجاح!"})

#     return jsonify({"status": "fail", "message": "بيانات الدخول غير صحيحة"}), 401

# @app.route('/reset-password', methods=['POST'])
# def reset_password():
#     data = request.get_json()
#     new_password = data.get('newPassword')

#     if not new_password:
#         return jsonify({"success": False, "error": "No password received"})

#     if users:
#         users[-1]["password"] = new_password
#         return jsonify({"success": True, "message": "تم تحديث كلمة المرور بنجاح"})

#     return jsonify({"success": False, "message": "لا يوجد مستخدم لتحديث كلمة المرور"})

# @app.route('/verify-code', methods=['POST'])
# def verify_code():
#     data = request.get_json()
#     code = data.get("code")
#     if code == VERIFICATION_CODE:
#         return jsonify({"success": True})
#     else:
#         return jsonify({"success": False})

# @app.route('/add-tuk-tuk', methods=['POST'])
# def add_tuk_tuk():
#     data = request.get_json()
#     driver_name = data.get("driverName")
#     driver_phone = data.get("driverPhone")
#     national_id = data.get("nationalId")
#     tuk_number = data.get("tukTukNumber")

#     if not all([driver_name, driver_phone, national_id, tuk_number]):
#         return jsonify({"status": "fail", "message": "يرجى ملء جميع الحقول"}), 400

#     tuktuks.append({
#         "driverName": driver_name,
#         "driverPhone": driver_phone,
#         "nationalId": national_id,
#         "tukTukNumber": tuk_number
#     })

#     return jsonify({"status": "success", "message": "تم حفظ بيانات التوكتوك بنجاح"})

# @app.route('/get-tuktuks', methods=['GET'])
# def get_tuktuks():
#     return jsonify(tuktuks)

# # ✅ آخر سطر فعلي لتشغيل السيرفر
# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

users = []
tuktuks = []
VERIFICATION_CODE = "1234"

# ✅ تسجيل مستخدم جديد
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    phone = data.get('phone')
    email = data.get('email')
    password = data.get('password')

    if not all([first_name, last_name, phone, email, password]):
        return jsonify({"status": "fail", "message": "يرجى ملء جميع الحقول"}), 400

    for user in users:
        if user["email"] == email:
            return jsonify({"status": "fail", "message": "هذا البريد مستخدم بالفعل"}), 400

    users.append({
        "firstName": first_name,
        "lastName": last_name,
        "phone": phone,
        "email": email,
        "password": password
    })

    return jsonify({
        "status": "success",
        "message": f"تم إنشاء الحساب بنجاح، مرحبًا {first_name}!"
    })

# ✅ تسجيل الدخول
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    for user in users:
        if user["email"] == email and user["password"] == password:
            return jsonify({"status": "success", "message": "تم تسجيل الدخول بنجاح!"})

    return jsonify({"status": "fail", "message": "بيانات الدخول غير صحيحة"}), 401

# ✅ إعادة تعيين كلمة المرور
@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    new_password = data.get('newPassword')

    if not new_password:
        return jsonify({"success": False, "error": "No password received"})

    if users:
        users[-1]["password"] = new_password
        return jsonify({"success": True, "message": "تم تحديث كلمة المرور بنجاح"})

    return jsonify({"success": False, "message": "لا يوجد مستخدم لتحديث كلمة المرور"})

# ✅ التحقق من كود التأكيد
@app.route('/verify-code', methods=['POST'])
def verify_code():
    data = request.get_json()
    code = data.get("code")
    if code == VERIFICATION_CODE:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})

# ✅ إضافة تكتوك جديد
@app.route('/add-tuk-tuk', methods=['POST'])
def add_tuk_tuk():
    data = request.get_json()
    driver_name = data.get("driverName")
    driver_phone = data.get("driverPhone")
    national_id = data.get("nationalId")
    tuk_number = data.get("tukTukNumber")
    rating = data.get("rating", 0)
    location = data.get("location", {"lat": 31.0409, "lng": 31.3785})  # طلخا كموقع افتراضي

    if not all([driver_name, driver_phone, national_id, tuk_number]):
        return jsonify({"status": "fail", "message": "يرجى ملء جميع الحقول"}), 400

    tuktuks.append({
        "driverName": driver_name,
        "driverPhone": driver_phone,
        "nationalId": national_id,
        "tukTukNumber": tuk_number,
        "rating": rating,
        "location": location
    })

    return jsonify({"status": "success", "message": "تم حفظ بيانات التوكتوك بنجاح"})

# ✅ جلب كل التكاتك
@app.route('/get-tuktuks', methods=['GET'])
def get_tuktuks():
    return jsonify(tuktuks)

# ✅ جلب كل المستخدمين
@app.route('/get-users', methods=['GET'])
def get_users():
    return jsonify(users)

# ✅ بيانات لوحة التحكم
@app.route('/get-dashboard-data', methods=['GET'])
def get_dashboard_data():
    avg_rating = 0
    if tuktuks:
        total = sum([t["rating"] for t in tuktuks])
        avg_rating = round(total / len(tuktuks), 1)

    return jsonify({
        "totalUsers": len(users),
        "totalTuktuks": len(tuktuks),
        "averageRating": avg_rating
    })

# ✅ تشغيل التطبيق
if __name__ == '__main__':
    app.run(debug=True)
