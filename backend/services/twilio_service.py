from twilio.twiml.messaging_response import MessagingResponse
from services.model_service import predict_dept, predict_sentiment
from config.db_config import cursor, db
from services.case_service import create_case

# Store user sessions
user_sessions = {}

def handle_whatsapp(user, msg):

    # Normalize input
    msg = msg.lower().strip()
    user = user.split("?")[0]

    resp = MessagingResponse()

    # Initialize session
    if user not in user_sessions:
        user_sessions[user] = {"state": "menu"}

    state = user_sessions[user]["state"]

    print("USER:", user)
    print("STATE:", state)
    print("MSG:", msg)

    # ==============================
    # STEP 1: MENU SELECTION (1/2/3)
    # ==============================
    if msg in ["1", "2", "3"]:
        user_sessions[user]["state"] = "input"

        if msg == "1":
            user_sessions[user]["type"] = "feedback"
            resp.message("Please share your feedback.")
        elif msg == "2":
            user_sessions[user]["type"] = "complaint"
            resp.message("Please describe your issue in detail.")
        else:
            user_sessions[user]["type"] = "inquiry"
            resp.message("Please type your query.")

        return str(resp)

    # ==============================
    # STEP 2: HANDLE INPUT
    # ==============================
    if state == "input":

        input_type = user_sessions[user]["type"]

        # -------- INQUIRY --------
        if input_type == "inquiry":
            user_sessions[user]["state"] = "menu"

            if "doctor" in msg or "timing" in msg:
                reply = """Our doctors are available from 9:00 AM to 5:00 PM 🕘

Reply 1, 2 or 3 to continue."""
            elif "appointment" in msg or "book" in msg:
                reply = """You can book an appointment by visiting the hospital and getting a token at reception.

Reply 1, 2 or 3 to continue."""
            elif "medicine" in msg or "delivery" in msg:
                reply = """Yes, we provide door delivery for medicines 💊

Reply 1, 2 or 3 to continue."""
            else:
                reply = """Our team will assist you shortly.

Reply 1, 2 or 3 to continue."""

            resp.message(reply)
            return str(resp)

        # -------- FEEDBACK / COMPLAINT --------
        dept = predict_dept(msg)
        sentiment, score = predict_sentiment(msg)

        cursor.execute(
            """INSERT INTO feedback 
            (text, department, sentiment, score, source) 
            VALUES (%s, %s, %s, %s, %s)""",
            (msg, dept, sentiment, score, "whatsapp")
        )
        db.commit()

        feedback_id = cursor.lastrowid
        create_case(feedback_id, dept, sentiment, msg)

        # Reset state
        user_sessions[user]["state"] = "menu"

        # -------- RESPONSE --------
        if input_type == "feedback":
            reply = """Thank you for your valuable feedback 🙏

We appreciate your input and will continue to improve our services.

Reply 1, 2 or 3 to continue."""
        else:
            reply = """We are sorry for the inconvenience caused.

Your issue will be addressed and resolved shortly. We will ensure a better experience at Blue Moon Hospital next time.

Thank you.

Reply 1, 2 or 3 to continue."""

        resp.message(reply)
        return str(resp)

    # ==============================
    # STEP 3: DEFAULT MENU
    # ==============================
    user_sessions[user]["state"] = "menu"

    resp.message("""Welcome to Blue Moon Hospital 🏥

1. Feedback  
2. Complaint  
3. Inquiry  

Reply with 1, 2 or 3.""")

    return str(resp)