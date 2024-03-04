from flask import Flask, render_template, request
from flask import redirect
from flask import jsonify
import json

from flaskext.mysql import MySQL

app = Flask(__name__)
mysql = MySQL()

app.config['MYSQL_DATABASE_HOST'] 	  = 'localhost'
app.config['MYSQL_DATABASE_PORT'] 	  = 3306
app.config['MYSQL_DATABASE_USER'] 	  = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'pass_root'
app.config['MYSQL_DATABASE_DB'] 	  = 'db_university'

mysql.init_app(app)

app = Flask(__name__)


@app.route('/')
def index():
	return render_template('index.html')
	
@app.route('/api/data')
def doGetData():
	
	data2=[]

	conn = mysql.connect()	
	cursor =conn.cursor()
	cursor.execute("SELECT DISTINCT  annee FROM resultats")	
	specialite_tuple = cursor.fetchall()
	h=  [item[0] for item in specialite_tuple]
	for annee in h:
		cursor.execute(f'SELECT count(*)  from resultats where ANNEE={annee}')	
		p = cursor.fetchall()
		p1 =[item[0] for item in p]
		p2=p1[0]
		data2.append({"annee":annee, "data":p2})	

	cursor.close()
	
	data_JSON  = json.dumps(data2)	
	return data_JSON 
@app.route('/api/data5')
def doGetData5():
	
	data2=[]

	conn = mysql.connect()	
	cursor =conn.cursor()
	cursor.execute("SELECT DISTINCT  specialite FROM resultats")	
	specialite_tuple = cursor.fetchall()
	h=  [item[0] for item in specialite_tuple]
	for specialite in h:
		cursor.execute("SELECT count(*)  from resultats where specialite='"+specialite+"' and MOYENNE>=10  and ANNEE=2021 ")	
		p = cursor.fetchall()
		p1 =[item[0] for item in p]
		p2=p1[0]
		data2.append({"specialite":specialite, "data":p2})	

	cursor.close()
	
	data_JSON5  = json.dumps(data2)	
	return data_JSON5 
@app.route('/api/data4')
def doGetData4():
	
	data4=[]

	conn = mysql.connect()	
	cursor =conn.cursor()
	cursor.execute("SELECT DISTINCT  annee FROM resultats")	
	specialite_tuple = cursor.fetchall()
	h=  [item[0] for item in specialite_tuple]
	for annee in h:  
		cursor.execute(f'SELECT count(*)  from resultats where ANNEE={annee} and MOYENNE>=10')	
		p = cursor.fetchall()
		p1 =[item[0] for item in p]
		p2=p1[0]
		data4.append({"annee":annee, "data":p2})	

	cursor.close()
	
	data_JSON4 = json.dumps(data4)	
	return data_JSON4 	
@app.route('/api/data2')
def doGetData2():
	
	data = {"annee":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	annee_tuple = cursor.fetchall()
	annee_list =  [item[0] for item in annee_tuple]
	data["annee"]=annee_list	

	cursor.execute("SELECT DISTINCT specialite FROM resultats")	

	specialite_tuple = cursor.fetchall()
	specialite_list =  [item[0] for item in specialite_tuple]
	
	for specialite in specialite_list:
		nombreetu_list1=[]
		for  annee in annee_list:
			cursor.execute("SELECT count(*) FROM resultats WHERE annee= "+str(annee)+" and specialite= '"+specialite+"'")	
			nombreetu_tuple = cursor.fetchall()
			nombreetu_list =  [item[0] for item in nombreetu_tuple]
			nombreetu_list2= nombreetu_list[0]
			nombreetu_list1.append(nombreetu_list2) 
		data["datasets"].append({"label":specialite, "data":nombreetu_list1})	
	
	data_JSON2 = json.dumps(data)	
	return data_JSON2 
@app.route('/api/data3')
def doGetData3():
	
	data3 = {"annee":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	annee_tuple = cursor.fetchall()
	annee_list =  [item[0] for item in annee_tuple]
	data3["annee"]=annee_list	

	cursor.execute("SELECT DISTINCT SEXE FROM resultats")	

	SEXE_tuple = cursor.fetchall()
	SEXE_list =  [item[0] for item in SEXE_tuple]
	
	for SEXE in SEXE_list:
		nombreetur_list1=[]
		for  annee in annee_list:
			cursor.execute("SELECT count(*) FROM resultats WHERE annee= "+str(annee)+" and SEXE='"+SEXE+"' and MOYENNE>=10" )	
			nombreetur_tuple = cursor.fetchall()
			nombreetur_list =  [item[0] for item in nombreetur_tuple]
			nombreetur_list2= nombreetur_list[0]
			nombreetur_list1.append(nombreetur_list2) 

		data3["datasets"].append({"label":SEXE, "data":nombreetur_list1})	
	
	data_JSON3 = json.dumps(data3)	
	return data_JSON3 

@app.route('/api/data6')
def doGetData6():
    data6 = []

    conn = mysql.connect()
    cursor = conn.cursor()

    cursor.execute("SELECT DISTINCT specialite FROM resultats")
    specialite_tuple = cursor.fetchall()
    specialite_list = [item[0] for item in specialite_tuple]

    for specialite in specialite_list:
        cursor.execute(f"SELECT COUNT(*) FROM resultats WHERE specialite='{specialite}'   and MOYENNE < 10")
        echec_result = cursor.fetchall()
        echec_value = [item[0] for item in echec_result]
        echec_value1 = echec_value[0]
        data6.append({ "specialite":specialite, "data": echec_value1})


    

    cursor.close()

    data_JSON6 = json.dumps(data6)
    return data_JSON6

	
if __name__ == '__main__':
	app.run(debug=True, port=5000)

	