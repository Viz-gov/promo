from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import csv

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

CSV_FILE = "emails.csv"

@app.route('/save-email', methods=['POST'])
def save_email():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    try:
        with open(CSV_FILE, 'a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([email])
        return jsonify({"message": "Email saved"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
