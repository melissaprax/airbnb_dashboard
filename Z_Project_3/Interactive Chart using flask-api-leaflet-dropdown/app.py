import numpy as np
import json

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///static/data/suicide.db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Suicides = Base.classes.suicides

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return render_template("index.html")


@app.route("/api/v1.0/suicides/year")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all suicides by country"""
    # Query all suicide data
    results = session.query(Suicides.country, Suicides.s2019, Suicides.s2020).all()

    session.close()
    
    # Convert list of tuples into normal list
    all_suicides = []
    for country, s2019, s2020 in results:
        suicide_dict = {}
        suicide_dict["country"] = country
        suicide_dict["s2019"] = s2019
        suicide_dict["s2020"] = s2020
        all_suicides.append(suicide_dict)

    return jsonify(all_suicides)

@app.route("/api/v1.0/boundaries")
def boundary():
    with open("./static/data/allData_reduced.geojson") as file:
        json_decoded = json.load(file)

    return json_decoded
# @app.route("/api/v1.0/passengers")
# def passengers():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query all passengers
#     results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_passengers = []
#     for name, age, sex in results:
#         passenger_dict = {}
#         passenger_dict["name"] = name
#         passenger_dict["age"] = age
#         passenger_dict["sex"] = sex
#         all_passengers.append(passenger_dict)

#     return jsonify(all_passengers)


if __name__ == '__main__':
    app.run(debug=True)
