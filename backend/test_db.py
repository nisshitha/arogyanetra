import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="appuser",
    password="nisshi@2006",
    database="arogyanetra"
)

print("Connected successfully ✅")