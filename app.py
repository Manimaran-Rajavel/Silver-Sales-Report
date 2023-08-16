from flask import Flask, render_template, request, make_response, Response
import mysql.connector
import json
from fpdf import FPDF 


app = Flask(__name__)

app.jinja_env.filters['tojson'] = json.dumps 

mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "",
    database = "silver_db"
)

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login_verify():
    name = request.form.get('username')
    password = request.form.get('password')
    mycursor = mydb.cursor()
    mycursor.execute('SELECT * FROM admin WHERE username=%s AND password=%s', (name, password))
    result = mycursor.fetchall()
    mycursor.close()
    if (result):
        return 'Success'
    else:
        return 'Unsuccess'

@app.route('/index', methods=['GET', 'POST'])
def index():

    # Items name suggestion
    mycursor4 = mydb.cursor(dictionary=True)
    mycursor4.execute("SELECT itm_code, name FROM items")
    itm_sug = mycursor4.fetchall()
    itmsugg = []
    for i in itm_sug:
        itmsugg.append(i['name'])
        # itmsugg.append(str(i['itm_code']))
    mycursor4.close()

    # Customer name suggestion retrive
    mycursor3 = mydb.cursor(dictionary=True)
    mycursor3.execute("SELECT name FROM customers")
    suggestion = mycursor3.fetchall()
    sugg = []
    for i in suggestion:
        sugg.append(i['name'])
    mycursor3.close()

    # Checking for token number and token_no auto increment
    mycursor2 = mydb.cursor()
    mycursor2.execute("SELECT MAX(token_no) FROM details_table")
    result3 = mycursor2.fetchall()
    tok_no = 0
    if (result3[0][0]):
        tok_no = int(result3[0][0]) + 1
        tok_no = str(tok_no).zfill(4)
    else:
        tok_no = str(1).zfill(4)

    # All details retrive for show in table 
    mycursor = mydb.cursor(dictionary=True)
    mycursor.execute("SELECT * FROM details_table ORDER BY id DESC")
    result = mycursor.fetchall()
    mycursor.close()

    mycursor2.close()
    return render_template('index.html', result=result, tok_no=tok_no, sugg=sugg, itmsugg=itmsugg)

@app.route('/sel-pdf', methods=['GET', 'POST'])
def sel_pdf():

    lst = request.args.get('arr')
    lst = json.loads(lst)
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(12, 10, 'TNo')
    pdf.cell(40, 10, 'Name')
    pdf.cell(31, 10, 'Item-Name')
    pdf.cell(22, 10, 'Touch')
    pdf.cell(25, 10, 'Date')
    pdf.cell(10, 10, 'Wt')
    pdf.cell(40, 10, 'Mark')
    pdf.cell(0, 10, 'Sts', ln=1)
    pdf.set_font('Arial', '', 10)
    for i in lst:
        pdf.cell(12, 10, i['token_no'])
        pdf.cell(40, 10, i['fst_name'])
        pdf.cell(31, 10, i['items'])
        pdf.cell(22, 10, i['touch'])
        pdf.cell(25, 10, i['date'])
        pdf.cell(10, 10, i['wight'])
        pdf.cell(40, 10, i['mark'])
        pdf.cell(0, 10, i['sts'], ln=1)

    pdf_data = pdf.output(dest='S').encode('latin1')

    response = make_response(pdf_data)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'inline; filename=print.pdf'

    return response
       


@app.route('/add', methods=['POST', 'GET'])
def add_btn():
    
    tokn_no = request.form.get('tokn_no')
    cust_name = request.form.get('cust_name')
    second_name = request.form.get('second_name')
    item_dtls = request.form.get('item_dtls')
    item_disc = request.form.get('item_discript')
    touch = request.form.get('buretRead')
    date = request.form.get('date')
    wight = request.form.get('wight')
    mark = request.form.get('mark')
    sts = request.form.get('sts')
    mycursor = mydb.cursor()
    mycursor.execute('INSERT INTO details_table (token_no, fst_name, sec_name, items, item_disc, touch, true_touch, date, wight, mark, sts) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (tokn_no, cust_name, second_name, item_dtls, item_disc, touch, touch, date, wight, mark, sts))
    mydb.commit()
    mycursor.close()

    return 'insert-success'

@app.route('/pdf', methods=['GET', 'POST'])
def adove_pdf():

    if request.args.get('tok-no'):

        tokno = request.args.get('tok-no')
        name = request.args.get('name')
        item = request.args.get('item')
        secname = request.args.get('secname')
        itmdes = request.args.get('itmdes')
        date = request.args.get('date')
        wight = request.args.get('wight')
        markdetl = request.args.get('mark')
        burt = request.args.get('burt')
        sts = request.args.get('sts')

        mycursor = mydb.cursor(dictionary=True)
        mycursor.execute("SELECT * FROM details_table WHERE token_no=%s", (tokno,))
        if (mycursor.fetchall()):
            pass
        else:
            mycursor.execute('INSERT INTO details_table (token_no, fst_name, sec_name, items, item_disc, touch, true_touch, date, wight, mark, sts) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)', (tokno, name, secname, item, itmdes, burt, burt, date, wight, markdetl, sts))
            mydb.commit()
            mycursor.close()

        lst = [request.args.get('name'), request.args.get('tokno'), request.args.get('item'), request.args.get('mark')]
    else:
        lst = [request.args.get('name'), request.args.get('tokno'), request.args.get('item')]

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    for i in lst:
        pdf.cell(40, 10, str(i))

    pdf_data = pdf.output(dest='S').encode('latin1')

    response = make_response(pdf_data)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'inline; filename=print.pdf'

    return response


@app.route('/delete', methods=['POST', 'GET'])
def delete():
    delete_id = request.form.get('del_id')
    delete_id = json.loads(delete_id)
    mycursor = mydb.cursor()
    for del_id in delete_id:
        mycursor.execute('DELETE FROM details_table WHERE token_no = %s', (del_id,))
        mydb.commit()
    mycursor.close()

    return 'deleted-successfully'

@app.route('/modify', methods=['POST', 'GET'])
def modify():
    tokn_no = request.form.get('tokn_no')
    cust_name = request.form.get('cust_name')
    second_name = request.form.get('second_name')
    item_dtls = request.form.get('item_dtls')
    item_disc = request.form.get('item_discript')
    buret_read = request.form.get('buretRead')
    date = request.form.get('date')
    wight = request.form.get('wight')
    mark = request.form.get('mark')
    sts = request.form.get('sts')
    mycursor = mydb.cursor()
    mycursor.execute('UPDATE details_table SET fst_name=%s, sec_name=%s, items=%s, item_disc=%s, touch=%s, date=%s, wight=%s, mark=%s, sts=%s WHERE token_no=%s', (cust_name, second_name, item_dtls, item_disc, buret_read, date, wight, mark, sts, tokn_no))
    mydb.commit()
    mycursor.close()

    return 'updated-successfully'

@app.route('/design')
def designPage():

    # Retreving items datas
    mycursor4 = mydb.cursor(dictionary=True)
    mycursor4.execute("SELECT * FROM items ORDER BY id DESC")
    item = mycursor4.fetchall()
    mycursor4.close()
    return render_template('designs.html', item=item)

@app.route('/add-design', methods=['POST', 'GET'])
def add_design():
    
    code = str(request.form.get('code'))
    itm_name = request.form.get('itm-name')
    mycursor = mydb.cursor()
    mycursor.execute("INSERT INTO items (itm_code, name) VALUES (%s, %s)", (code, itm_name))
    mydb.commit()
    mycursor.close()
    return "Added-Success"

@app.route('/update-design', methods=['POST', 'GET'])
def update_design():
    
    code = request.form.get('code')
    itm_name = request.form.get('itm-name')
    id = request.form.get('id')
    mycursor = mydb.cursor()
    mycursor.execute("UPDATE items SET itm_code=%s, name=%s WHERE id=%s", (code, itm_name, int(id)))
    mydb.commit()
    mycursor.close()
    return "Updated-Success"

@app.route('/delete-design', methods=['POST', 'GET'])
def delete_design():
    id = request.form.get('id')
    mycursor = mydb.cursor()
    mycursor.execute('DELETE FROM items WHERE id = %s', (id,))
    mydb.commit()
    mycursor.close()
    return 'DEleted-success'

@app.route('/customer')
def customerPage():

    # Retreving customer datas
    mycursor3 = mydb.cursor(dictionary=True)
    mycursor3.execute("SELECT * FROM customers ORDER BY id DESC")
    cust_detl = mycursor3.fetchall()
    mycursor3.close()
    return render_template('customer.html', cust_detl=cust_detl)

@app.route('/add-customer', methods=['POST', 'GET'])
def add_customer():
    
    name = request.form.get('name')
    mob_no = request.form.get('mob-no')
    address = request.form.get('address')
    mycursor = mydb.cursor()
    mycursor.execute("INSERT INTO customers (name, mob_no, address) VALUES (%s, %s, %s)", (name, mob_no, address))
    mydb.commit()
    mycursor.close()
    return "Added-Success"

@app.route('/update-customer', methods=['POST', 'GET'])
def update_customer():
    
    name = request.form.get('name')
    mob_no = request.form.get('mob-no')
    address = request.form.get('address')
    id = request.form.get('id')
    mycursor = mydb.cursor()
    mycursor.execute("UPDATE customers SET name=%s, mob_no=%s, address=%s WHERE id=%s", (name, mob_no, address, int(id)))
    mydb.commit()
    mycursor.close()
    return "Updated-Success"

@app.route('/delete-customer', methods=['POST', 'GET'])
def delete_customer():
    id = request.form.get('id')
    mycursor = mydb.cursor()
    mycursor.execute('DELETE FROM customers WHERE id = %s', (id,))
    mydb.commit()
    mycursor.close()
    return 'Deleted-success'



if (__name__ == '__main__'):
    app.run(debug=True)