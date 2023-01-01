from flask import Flask,request

import Machine_Learning as ML


app = Flask(__name__)
@app.route("/IsOk")
def Onclick():
  IsOk= request.args.get('IsOk')
  return {"IsOk":ML.notreModel(IsOk)}

@app.route("/comments")
def comments():
    comment= request.args.get('comment')
    return {"comments":ML.classify(comment)[0]}


if __name__ == "__main__":
    app.run(debug=True)
