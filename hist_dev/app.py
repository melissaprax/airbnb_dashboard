import csv
import os
from flask import Flask, render_template, jsonify, url_for # url_for has Flask adds path to other files automatically
import sqlalchemy # Method chain create_engine() when needed
import pandas as pd

app = Flask(__name__) # This is my "original action figure in the box"

# Since "__name__" belongs to file, __name__ is an object. The object is the file itself.

# Create connection to database

engine = sqlalchemy.create_engine("sqlite:///db.sqlite") # This is my "original action figure in the box"

# Define con 

# Option 1:
con = engine.raw_connection()

# Option 2:
# con = engine.connect()

# Read in the data from the database

# Option 1:
df = pd.read_sql("SELECT * FROM airbnb", con=con)

# Note change SELECT statement to only select the fields needed for each plot.

# Option 2:
# df = pd.read_sql(sqlalchemy.text("SELECT * FROM airbnb"), con=con)


# This is an HTML route. It's a route that returns HTML instead of JSON.

@app.route("/") # Routes represent added functionality to the app
def index():
    return render_template("index.html")


# This is an API route. It's a route that returns JSON instead of HTML.
@app.route("/api/data")
def data():
    return jsonify(df.to_dict(orient="records"))

# We have to convert the dataframe to a dictionary before we can jsonify it. And we have to jsonify the dictionary before it can be understood by javascript.

# Remember, in the case of this project, JavaScript is the client and Flask is the server. When JavaScript makes a request to Flask, Flask will return a response. The response will be in the form of JSON. 

# First things first, we need to connect to the database.

# Mark would use pd.read_sql() to connect to the database.

# pd.read_sql() needs a str and a connection.






# Notes from tutoring session with Mark:

# If you pass a variable into render_template(), it uses that variable to generate the HTML page.

# Therefore, the data will become HTML and javascript cant use it.

# And that's a problem because D3 is javascript and we need useable data!

# Important note: web developers will refer to the route above as "home" when there is nothing following "/".

# The parameters are the items that follow "/" in the URL.

# Note: you'll hear people use the terms endpoint and route interchangeably. An endpoint is a route. A route is an endpoint.

# Note: You could also hook up sessions to and app. Sessions are a way to store information about a user from one request to another.

# NOte: Django gives the programmer a lot of functionality out of the box. Flask is more bare bones. You have to add more functionality to it.

if __name__ == "__main__":
    app.run(debug=True)

# What __name__ == "__main__" does is ensure that the app only runs if the script is executed directly from the Python interpreter and not used as an imported module.

# Python calls the first file that you run.

# If this was the first file that was called, then run it. Otherwise don't run it.

# The debug=True parameter tells our server to rerun every time we make a change to our code. This will help us see our changes in real time.

# Research dunder variable or dunder method.

# Dunder variables are special variables that Python creates for you.