# import dependencies
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from config import pg_password
import time
from datetime import datetime

#####################################################
# Database Setup
#####################################################
# Create connection string to postgres
connection_string = f"postgres:{pg_password}@localhost:5432/covid_mask_effect_db"
engine = create_engine(f'postgresql://{connection_string}')

# Reflect database into a new model using Base = automap()
Base = automap_base()

# Setup .prepare(engine, reflect=True) to reflect tables
Base.prepare(engine, reflect=True)

# Save reference to california_data, nocal_data, and socal_data tables
cali_data = Base.classes.cali_2020
norcal_data = Base.classes.norcal_geo
socal_data = Base.classes.socal_geo

#######################################################
# Setup Flask
#######################################################

# Initiate Flask app
app = Flask(__name__)

@app.route('/')
def home_page():
    # Create empty list
    cali_cases_date = []
    # Create connection
    session = Session(engine)
    # california_data
    # cali_counties = session.query(cali_data.county).all()
    cali_cases = session.query(cali_data.cases).all()
    cali_dates = session.query(cali_data.date).all()
    # dates_total = session.quesry(cali)

    # nocal_data
    norcal_counties = session.query(norcal_data.fips).all()
    norcal_cases = session.query(norcal_data.cases).all()
    # nocal_dates = session.query(nocal_data.date).all()

    # socal_data
    socal_counties = session.query(socal_data.fips).all()
    socal_cases = session.query(socal_data.cases).all()
    # socal_dates = session.query(socal_data.date).all()

    # return jsonify({"Cali Cases": cali_cases, "Cali Dates": cali_dates}, {"North Cali County": nocal_counties, "North Cali Cases": nocal_cases}, {"So Cal County": socal_counties, " So Cal Cases": socal_cases})
    return jsonify(cali_dates)
# @app.route('/test', methods=['GET', 'POST'])

# def homepage():

# @app.route("/api/v1.0/calendar")
# def calendar():
#     return 

# @app.route("/api/v1.0/map")
# def map():

# @app.route("/api/v1.0/scatter")
# def scatter():

# @app.route("/api/v1.0/")
#############################################################
# Endpoints for jsonified data
#############################################################
# cali_cases_by_date endpoint
@app.route("/api/v3.0/cali_cases_by_date")
def cali_cases_by_date():
    # Connect to engine
    session = Session(engine)
 
    # session.query for all cali_data for cases and date
    cali_cases = session.query(cali_data.cases).all()
    cali_dates = session.query(cali_data.date).all()
    
    # now = datetime.now()
    # date_time = now.strftime(cali_dates)
    # epoch_timestamp = time.strptime(cali_dates)
    # time_object = time.strptime(cali_dates, date_time)
    # epoch_timestamp = time.mktime(time_object)
    
    # t = datetime.datetime.now(cali_dates)
    # t.strftime('%m/%d/%Y')
    # epoch_timestamp=time.mktime(t)




    # return data with jsonify
    return jsonify([{"All Cali Cases": cali_cases, "date": cali_dates}])

# nocal_county_cases endpoint
@app.route("/api/v3.0/nocal_county_cases")
def nocal_county_cases():
    # Connect to engine
    session = Session(engine)
    
    # session.query for all nocal_data for fips and cases
    norcal_counties = session.query(norcal_data.county).all()
    norcal_cases = session.query(norcal_data.cases).all()
    norcal_lat = session.query(norcal_data.latitude).all()
    norcal_long = session.query(norcal_data.longitude).all()
    # return data with jsonify
    return jsonify([{"county": norcal_counties, "cases": norcal_cases, "latitude": norcal_lat, "longitude": norcal_long}])

# socal_county_cases endpoint
@app.route("/api/v3.0/socal_county_cases")
def socal_county_cases():
    # Connect to engine
    session = Session(engine)

    # session.query for all socal_data for fips and cases
    socal_counties = session.query(socal_data.county).all()
    socal_cases = session.query(socal_data.cases).all()
    socal_lat = session.query(socal_data.latitude).all()
    socal_long = session.query(socal_data.longitude).all()
    # return data with jsonify
    return jsonify([{"county": socal_counties, "cases": socal_cases,"latitude": socal_lat, "longitude": socal_long}])

# Run app
if __name__ == "__main__":
    app.run(debug=True) 