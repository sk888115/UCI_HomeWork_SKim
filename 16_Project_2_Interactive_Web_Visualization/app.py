# import dependencies
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from config import pg_password

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
cali_data = Base.classes.cali_data
nocal_data = Base.classes.nocal_data
socal_data = Base.classes.socal_data

#######################################################
# Setup Flask
#######################################################

# Initiate Flask app
app = Flask(__name__)

@app.route('/')
def home_page():
    # Create connection
    session = Session(engine)
    # california_data
    # cali_counties = session.query(cali_data.county).all()
    cali_cases = session.query(cali_data.cases).all()
    cali_dates = session.query(cali_data.date).all()
    # dates_total = session.quesry(cali)

    # nocal_data
    nocal_counties = session.query(nocal_data.county).all()
    nocal_cases = session.query(nocal_data.cases).all()
    # nocal_dates = session.query(nocal_data.date).all()

    # socal_data
    socal_counties = session.query(socal_data.county).all()
    socal_cases = session.query(socal_data.cases).all()
    # socal_dates = session.query(socal_data.date).all()

    return jsonify({"Cali Cases": cali_cases, "Cali Dates": cali_dates}, {"North Cali County": nocal_counties, "North Cali Cases": nocal_cases}, {"So Cal County": socal_counties, " So Cal Cases": socal_cases})

# @app.route('/test', methods=['GET', 'POST'])

# def homepage():

# @app.route("/api/v1.0/calendar")
# def calendar():

# @app.route("/api/v1.0/map")
# def map():

# @app.route("/api/v1.0/scatter")
# def scatter():

# @app.route("/api/v1.0/")



# Run app
if __name__ == "__main__":
    app.run(debug=True) 