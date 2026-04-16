from sqlalchemy import Column,Integer,Float,String,DateTime
from database import Base
import datetime


class TrafficLog(Base):

    __tablename__="traffic_logs"

    id=Column(Integer,primary_key=True)

    cars=Column(Integer)
    bikes=Column(Integer)
    autos=Column(Integer)
    buses=Column(Integer)
    trucks=Column(Integer)

    total=Column(Integer)

    density=Column(String)

    avg_speed=Column(Float)

    time_period=Column(String)

    timestamp=Column(DateTime,default=datetime.datetime.utcnow)