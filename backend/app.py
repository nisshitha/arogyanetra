from flask import Flask, request, jsonify
from services.twilio_service import handle_whatsapp
from services.imap_service import fetch_emails
from services.case_service import start_sla, resolve_case
from config.db_config import cursor  # ✅ FIXED

app = Flask(__name__)

# ==============================
# HOME
# ==============================
@app.route('/')
def home():
    return "Backend running 🚀"

# ==============================
# WHATSAPP (TWILIO)
# ==============================
@app.route('/sms', methods=['POST'])
def sms():
    user = request.form.get('From')
    msg = request.form.get('Body')

    return handle_whatsapp(user, msg)

# ==============================
# FETCH EMAILS (IMAP)
# ==============================
@app.route('/fetch-emails')
def emails():
    fetch_emails()
    return "Emails processed"

# ==============================
# ACTION TAKEN → START SLA
# ==============================
@app.route('/case/action/<int:case_id>', methods=['POST'])
def take_action(case_id):
    start_sla(case_id)
    return jsonify({"message": "SLA started"})

# ==============================
# RESOLVE CASE
# ==============================
@app.route('/case/resolve/<int:case_id>', methods=['POST'])
def resolve(case_id):
    resolve_case(case_id)
    return jsonify({"message": "Case resolved"})

# ==============================
# GET ALL CASES
# ==============================
@app.route('/cases')
def get_cases():
    cursor.execute("SELECT * FROM cases")
    rows = cursor.fetchall()

    cases = []
    for row in rows:
        cases.append({
            "id": row[0],
            "feedback_id": row[1],
            "department": row[2],
            "priority": row[3],
            "status": row[4],
            "created_at": str(row[5]),
            "action_taken_at": str(row[6]) if row[6] else None,
            "sla_deadline": str(row[7]) if row[7] else None,
            "resolved_at": str(row[8]) if row[8] else None
        })

    return jsonify({"cases": cases})

# ==============================
# RUN
# ==============================
if __name__ == '__main__':
    app.run(debug=False)