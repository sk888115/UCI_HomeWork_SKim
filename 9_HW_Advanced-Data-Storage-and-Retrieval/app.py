#import Flask
from flask import Flask, jsonify

import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func ,inspect



# Database Setup
#---------------------------------------------------------
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)
Base.classes.keys()

# Save references to each table
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

inspector = inspect(engine)
inspector.get_table_names()




# Flask Setup
#---------------------------------------------------------
app = Flask(__name__)


#Query for the dates and temperature observations from the last year.

@app.route("/")
def home():
    return (
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start><br/>"
        f"/api/v1.0/<start>/<end>"
    )


#returns precipitation data
@app.route("/api/v1.0/precipitation")
def precipitation():
    result_1 = session.query(Measurement.date, Measurement.prcp).filter(Measurement.date>="2016-08-23").all()
    first_dict = list(np.ravel(result_1))

    return jsonify(first_dict)


# returns list of stations
@app.route("/api/v1.0/stations")
def stations():
    result_2 = session.query(Station.station, Station.name).all()

    sec_dict = list(np.ravel(result_2))

    return jsonify(sec_dict)


#returns temp observation
@app.route("/api/v1.0/tobs")
def tobs():
    result_3 = session.query(Measurement.date, Measurement.tobs).\
            filter(Measurement.date>="2016-08-23").\
            filter(Measurement.date<="2017-08-23").all()
       
    temp_dict = list(np.ravel(result_3))

    return jsonify(temp_dict)



def calc_temp(start_date, end_date):
    
    return session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
        filter(Measurement.date >= start_date).filter(Measurement.date <= end_date).all()


#returns start
@app.route("/api/v1.0/<start>")
def start(start):

    #First we find the last date in the database
    last_date_query = session.query(func.max(func.strftime("%Y-%m-%d", Measurement.date))).all()
    max_date = last_date_query[0][0]

    #get the temperatures
    temp = calc_temp(start, max_date)

    #create a list
    return_list = []
    date_dict = {'start_date': start, 'end_date': max_date}
    return_list.append(date_dict)
    return_list.append({'Observation': 'TMIN', 'Temperature': temp[0][0]})
    return_list.append({'Observation': 'TAVG', 'Temperature': temp[0][1]})
    return_list.append({'Observation': 'TMAX', 'Temperature': temp[0][2]})

    return jsonify(return_list)


#returns start & end
@app.route("/api/v1.0/<start>/<end>")
def start_end(start, end):
    
    #get the temperatures
    se_temp = calc_temp(start, end)

    #create a list
    return_list = []
    date_dict = {'start_date': start, 'end_date': end}
    return_list.append(date_dict)
    return_list.append({'Observation': 'TMIN', 'Temperature': se_temp[0][0]})
    return_list.append({'Observation': 'TAVG', 'Temperature': se_temp[0][1]})
    return_list.append({'Observation': 'TMAX', 'Temperature': se_temp[0][2]})

    return jsonify(return_list)




    
if __name__ == '__main__':
    app.run(debug=True)
