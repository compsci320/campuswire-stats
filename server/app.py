import nltk
import json
from nltk.corpus import stopwords
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def status():
    return jsonify({ 'status': 'running' }), 200

@app.route('/data', methods=['GET'])
def get_data():
    f = open('mock.json')

    data = json.load(f)
    json_data = {}

    for item in data:
        title = item["title"]
        if ("office" in title.lower() or "hour" in title.lower()) and "Office Hours" not in json_data:
            json_data["Office hours"] = [item]
        elif ("office" in title.lower() or "hour" in title.lower()):
            json_data["Office hours"].append(item)
        elif ("hw" in title.lower() or "homework" in title.lower()) and "Homework" not in json_data:
            json_data["Homework"] = [item]
        elif ("hw" in title.lower() or "homework" in title.lower()):
            json_data["Homework"].append(item)
        elif ("quiz" in title.lower() or "quizzes" in title.lower()) and "Quiz" not in json_data:
            json_data["Quiz"] = [item]
        elif ("quiz" in title.lower() or "quizzes" in title.lower()):
            json_data["Quiz"].append(item)
        elif "exam" in title.lower() and "Exam" not in json_data:
            json_data["Exam"] = [item]
        elif "exam" in title.lower():
            json_data["Exam"].append(item)
        elif ("lectures" in title.lower() or "lecture" in title.lower()) and "Lecture" not in json_data:
            json_data["Lecture"] = [item]
        elif ("lectures" in title.lower() or "lecture" in title.lower()):
            json_data["Lecture"].append(item)
        elif "Other" not in json_data:
            json_data["Other"] = [item]
        else:
            json_data["Other"].append(item)

    return json.dumps(json_data)

if __name__ == '__main__':
    app.run()
