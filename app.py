import os
import numpy as np
import json
import sqlalchemy
import pandas as pd

from flask import (
    Flask,
    jsonify,
    render_template,
    request,
    redirect,
    url_for)

# from flask_sqlalchemy import SQLAlchemy

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

# #################################################
# # Databse Setup
# #################################################

engine = sqlalchemy.create_engine("sqlite:///db.sqlite")

# con = engine.raw_connection()

df = pd.read_sql("SELECT * FROM airbnb", con=engine)
staten_island_df = pd.read_sql("SELECT id, neighbourhood_group, latitude, longitude, room_type FROM airbnb WHERE neighbourhood_group = 'Staten Island'", con=engine)
bronx_df = pd.read_sql("SELECT id, neighbourhood_group, latitude, longitude, room_type FROM airbnb WHERE neighbourhood_group = 'Bronx'", con=engine)
queens_df = pd.read_sql("SELECT id, neighbourhood_group, latitude, longitude, room_type FROM airbnb WHERE neighbourhood_group = 'Queens'", con=engine)
brooklyn_df = pd.read_sql("SELECT id, neighbourhood_group, latitude, longitude, room_type FROM airbnb WHERE neighbourhood_group = 'Brooklyn'", con=engine)
manhattan_df = pd.read_sql("SELECT id, neighbourhood_group, latitude, longitude, room_type FROM airbnb WHERE neighbourhood_group = 'Manhattan'", con=engine)
print(staten_island_df)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return render_template("index.html") # Note: This file, in the templates folder, needs to be completed.

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

if __name__ == "__main__":
    app.run(debug=True)