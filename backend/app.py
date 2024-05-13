# backend/app.py
import os
from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename
from flask_cors import CORS




app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Hello from Flask!"


# ファイルアップロードディレクトリの設定
UPLOAD_FOLDER = '/path/to/upload'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# ディレクトリが存在しない場合は作成
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/api/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(save_path)
        return jsonify({"message": "File uploaded successfully", "path": save_path}), 200
    else:
        return jsonify({"error": "File type not permitted"}), 400

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in {'mp4', 'avi', 'mov'}  # 許可されるファイル拡張子
    # ファイルアップロードのロジック


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

