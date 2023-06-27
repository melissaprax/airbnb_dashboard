# Original API from Ethan & Developer Branch Work:

# import csv
import os
from flask import Flask, render_template, jsonify, url_for # url_for has Flask adds path to other files automatically
import sqlalchemy # Method chain create_engine() when needed
import pandas as pd

# Create an instance of Flask

app = Flask(__name__) # This is my "original action figure in the box"

# Create engine using sqlalchemy

engine = sqlalchemy.create_engine("sqlite:///db.sqlite") # This is my "original action figure in the box"

# Connect to the database

con = engine.connect()

# Read in data using pandas

df = pd.read_sql(sqlalchemy.text("SELECT * FROM airbnb"), con=con)

# staten_island_df = pd.read_sql(sqlalchemy.text("SELECT id, neighbourhood_group, latitude, longitude, room_type FROM airbnb WHERE neighbourhood_group = 'Staten Island'"), con=con)
# bronx_df = pd.read_sql(sqlalchemy.text("SELECT id, neighbourhood_group, latitude, longitude, room_type FROM airbnb WHERE neighbourhood_group = 'Bronx'"), con=con)
# queens_df = pd.read_sql(sqlalchemy.text("SELECT id, neighbourhood_group, latitude, longitude, room_type FROM airbnb WHERE neighbourhood_group = 'Queens'"), con=con)
# brooklyn_df = pd.read_sql(sqlalchemy.text("SELECT id, neighbourhood_group, latitude, longitude, room_type FROM airbnb WHERE neighbourhood_group = 'Brooklyn'"), con=con)
# manhattan_df = pd.read_sql(sqlalchemy.text("SELECT id, neighbourhood_group, latitude, longitude, room_type FROM airbnb WHERE neighbourhood_group = 'Manhattan'"), con=con)

# This is an HTML route. It's a route that returns HTML instead of JSON.

@app.route("/") # Routes represent added functionality to the app
def index():
    return render_template("index.html")


# This is an API route. It returns the entire dataset in JSON format.
@app.route("/api/data")
def data():
    return jsonify(df.to_dict(orient="records"))

# @app.route("/api/staten_island")
# def staten_island():
#     return jsonify(staten_island_df.to_dict(orient="records"))

# @app.route("/api/bronx")
# def bronx():
#     return jsonify(bronx_df.to_dict(orient="records"))

# @app.route("/api/queens")
# def queens():
#     return jsonify(queens_df.to_dict(orient="records"))

# @app.route("/api/brooklyn")
# def bronx():
#     return jsonify(brooklyn_df.to_dict(orient="records"))

# @app.route("/api/manhattan")
# def bronx():
#     return jsonify(manhattan_df.to_dict(orient="records"))

# Set debug to True so that Flask will automatically restart when changes are detected.
if __name__ == "__main__":
    app.run(debug=True)


# Notes from tutoring session with Mark:

# If you pass a variable into render_template(), it uses that variable to generate the HTML page.

# Therefore, the data will become HTML and javascript cant use it.

# And that's a problem because D3 is javascript and we need useable data!

# Important note: web developers will refer to the route above as "home" when there is nothing following "/".

# The parameters are the items that follow "/" in the URL.

# Note: you'll hear people use the terms endpoint and route interchangeably. An endpoint is a route. A route is an endpoint.

# Note: You could also hook up sessions to and app. Sessions are a way to store information about a user from one request to another.

# Note: Django gives the programmer a lot of functionality out of the box. Flask is more bare bones. You have to add more functionality to it.

# What __name__ == "__main__" does is ensure that the app only runs if the script is executed directly from the Python interpreter and not used as an imported module.

# Python calls the first file that you run.

# If this was the first file that was called, then run it. Otherwise don't run it.

# The debug=True parameter tells our server to rerun every time we make a change to our code. This will help us see our changes in real time.

# Research dunder variable or dunder method.

# Dunder variables are special variables that Python creates for you.

# We have to convert the dataframe to a dictionary before we can jsonify it. And we have to jsonify the dictionary before it can be understood by javascript.

# Remember, in the case of this project, JavaScript is the client and Flask is the server. When JavaScript makes a request to Flask, Flask will return a response. The response will be in the form of JSON.

# First things first, we need to connect to the database.

# Mark would use pd.read_sql() to connect to the database.

# pd.read_sql() needs a str and a connection.

# Since "__name__" belongs to file, __name__ is an object. The object is the file itself.