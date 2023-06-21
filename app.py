import os
import numpy as np
import json

from flask import (
    Flask,
    jsonify,
    render_template,
    request,
    redirect)

from flask_sqlalchemy import SQLAlchemy

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

#################################################
# Databse Setup
#################################################

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite"

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

class Airbnb(db.Model):
    __tablename__ = 'airbnb'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    host_id = db.Column(db.Integer)
    host_name = db.Column(db.String(64))
    neighbourhood_group = db.Column(db.String(64))
    neighbourhood = db.Column(db.String(64))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    room_type = db.Column(db.String(64))
    price = db.Column(db.Integer)
    minimum_nights = db.Column(db.Integer)
    number_of_reviews = db.Column(db.Integer)
    last_review = db.Column(db.String(64))
    reviews_per_month = db.Column(db.Float)
    calculated_host_listings_count = db.Column(db.Integer)
    availability_365 = db.Column(db.Integer)

with app.app_context():
    db.create_all()

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return render_template("index.html") # Note: This file, in the templates folder, needs to be completed.


# Note: We are mapping/plotting Airbnb listing using the following fields:
# ID, Name, Neighbourhood Group, Latitude, Longitude, Room Type, and Price.
# Thus, we only need to query the database for these fields.    


# This route, when called, will query db.sqlite for the fields listed above and return a jsonified list of dictionaries for each row in the database.
@app.route("/api/airbnb")
def airbnb():
    results = db.session.query(Airbnb.id, Airbnb.name, Airbnb.neighbourhood_group, Airbnb.latitude, Airbnb.longitude, Airbnb.room_type, Airbnb.price).all()
    
    # Create a dictionary from the row data and append to a list of all_airbnb
    all_airbnb = []
    for id, name, neighbourhood_group, latitude, longitude, room_type, price in results:
        airbnb_dict = {}
        airbnb_dict["id"] = id
        airbnb_dict["name"] = name
        airbnb_dict["neighbourhood_group"] = neighbourhood_group
        airbnb_dict["latitude"] = latitude
        airbnb_dict["longitude"] = longitude
        airbnb_dict["room_type"] = room_type
        airbnb_dict["price"] = price
        all_airbnb.append(airbnb_dict)

    return jsonify(all_airbnb)


@app.route("/api/staten-island")
def staten_island():
    results = db.session.query(Airbnb.neighbourhood_group, Airbnb.latitude, Airbnb.longitude, Airbnb.room_type).filter(Airbnb.neighbourhood_group=="Staten Island").all()

    # Create a dictionary from the row data and append to a list of all_airbnb
    staten_island_list = []
    for neighbourhood_group, latitude, longitude, room_type in results:
        staten_island_dict = {}
        staten_island_dict["neighbourhood_group"] = neighbourhood_group
        staten_island_dict["latitude"] = latitude
        staten_island_dict["longitude"] = longitude
        staten_island_dict["room_type"] = room_type
        staten_island_list.append(staten_island_dict)

    return jsonify(staten_island_list)

@app.route("/api/brooklyn")
def brooklyn():
    results = db.session.query(Airbnb.neighbourhood_group, Airbnb.latitude, Airbnb.longitude, Airbnb.room_type).filter(Airbnb.neighbourhood_group=="Brooklyn").all()

    # Create a dictionary from the row data and append to a list of all_airbnb
    brooklyn_list = []
    for neighbourhood_group, latitude, longitude, room_type in results:
        brooklyn_dict = {}
        brooklyn_dict["neighbourhood_group"] = neighbourhood_group
        brooklyn_dict["latitude"] = latitude
        brooklyn_dict["longitude"] = longitude
        brooklyn_dict["room_type"] = room_type
        brooklyn_list.append(brooklyn_dict)

    return jsonify(brooklyn_list)

@app.route("/api/manhattan")
def staten_island():
    results = db.session.query(Airbnb.neighbourhood_group, Airbnb.latitude, Airbnb.longitude, Airbnb.room_type).filter(Airbnb.neighbourhood_group=="Staten Island").all()

    # Create a dictionary from the row data and append to a list of all_airbnb
    staten_island_list = []
    for neighbourhood_group, latitude, longitude, room_type in results:
        staten_island_dict = {}
        staten_island_dict["neighbourhood_group"] = neighbourhood_group
        staten_island_dict["latitude"] = latitude
        staten_island_dict["longitude"] = longitude
        staten_island_dict["room_type"] = room_type
        staten_island_list.append(staten_island_dict)

    return jsonify(staten_island_list)

@app.route("/api/queens")
def staten_island():
    results = db.session.query(Airbnb.neighbourhood_group, Airbnb.latitude, Airbnb.longitude, Airbnb.room_type).filter(Airbnb.neighbourhood_group=="Staten Island").all()

    # Create a dictionary from the row data and append to a list of all_airbnb
    staten_island_list = []
    for neighbourhood_group, latitude, longitude, room_type in results:
        staten_island_dict = {}
        staten_island_dict["neighbourhood_group"] = neighbourhood_group
        staten_island_dict["latitude"] = latitude
        staten_island_dict["longitude"] = longitude
        staten_island_dict["room_type"] = room_type
        staten_island_list.append(staten_island_dict)

    return jsonify(staten_island_list)

@app.route("/api/bronx")
def staten_island():
    results = db.session.query(Airbnb.neighbourhood_group, Airbnb.latitude, Airbnb.longitude, Airbnb.room_type).filter(Airbnb.neighbourhood_group=="Staten Island").all()

    # Create a dictionary from the row data and append to a list of all_airbnb
    staten_island_list = []
    for neighbourhood_group, latitude, longitude, room_type in results:
        staten_island_dict = {}
        staten_island_dict["neighbourhood_group"] = neighbourhood_group
        staten_island_dict["latitude"] = latitude
        staten_island_dict["longitude"] = longitude
        staten_island_dict["room_type"] = room_type
        staten_island_list.append(staten_island_dict)

    return jsonify(staten_island_list)
# Note for next programming session:
# As a group, we need to decide on the following:
# 1. Do we want to make multiple tables in the database?
# 2. If so, what fields do we want to include in each table?
# 3. If not, so be in. We can proceed.
# 4. Do we want/need to have multiple API routes? Have routes for each neighborhood 
# 5. We could simply have one API route that returns all the data in the database (or a subset of the data).
# 6. Note: Check requirements and grading rubric for the project.

