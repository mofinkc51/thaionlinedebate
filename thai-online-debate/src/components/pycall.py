from flask import Flask, jsonify, render_template, request
import requests
import json

app = Flask(__name__)


def load_file(file_name):
    data = None
    with open(file_name, 'r') as file:
        data = file.read()
    return data

@app.route('/pycall')
def pycall():
    content = request.args.get('content', 0, type=str)
    
    print("call_received",content)
    return jsonify(result=response_json)

@app.route('/')
def index():
    return load_file("basic.html")

url = "https://api.aiforthai.in.th/tagsuggestion"
 
text = 'ล้างเครื่องโน๊ทบุ๊กเเล้วเป็นเเบบนี้มา2-3วันเเล้วทำไงดีคะ'
 
data = {'text':text,'numtag':'5'}
 
headers = {
    'Apikey': "OKXVty86JM5w4g7ve9EyJfEfEXVArVHE",
    }
 
response = requests.post(url, data=data, headers=headers)
 
response_json = json.loads(response.text)

datas = (response_json['tags'])
#print(response_json['tags'])

def rep():   
    s = {""}
    count = 0
    for key in datas:
        #print(response_json['tags'][count-1]['tag'])
        count += 1
        datarep = repr(response_json['tags'][count-1]['tag'])
        print(datarep)
    return datarep
        


import webbrowser
print("opening localhost")
url1 = "http://127.0.0.1:5000/"
a = rep()
webbrowser.open(url1)
app.run()