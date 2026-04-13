import imaplib
import email
import os
from dotenv import load_dotenv

from services.case_service import create_case
from services.model_service import predict_dept, predict_sentiment
from config.db_config import cursor, db

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASS = os.getenv("EMAIL_PASS")


def fetch_emails():
    print("🔄 Fetching emails...")

    mail = imaplib.IMAP4_SSL("imap.gmail.com")
    mail.login(EMAIL_USER, EMAIL_PASS)
    mail.select("inbox")

    # ✅ ONLY NEW EMAILS
    status, messages = mail.search(None, '(UNSEEN)')

    email_ids = messages[0].split()
    print(f"📩 New Emails found: {len(email_ids)}")

    for num in email_ids:
        _, msg_data = mail.fetch(num, "(RFC822)")
        msg = email.message_from_bytes(msg_data[0][1])

        # ✅ FILTER: Skip Gmail system mails
        sender = msg.get("From", "")
        if "no-reply" in sender.lower() or "google" in sender.lower():
            print("⛔ Skipping system mail:", sender)
            continue

        # ✅ EXTRACT CLEAN BODY
        body = ""
        if msg.is_multipart():
            for part in msg.walk():
                if part.get_content_type() == "text/plain":
                    body = part.get_payload(decode=True).decode(errors="ignore")
                    break
        else:
            body = msg.get_payload(decode=True).decode(errors="ignore")

        # ✅ CLEAN TEXT
        if not body or len(body.strip()) < 10:
            print("⛔ Skipping empty/short mail")
            continue

        body = body.replace("\r", "").strip()

        print("📄 Clean Email:", body[:100])

        # ✅ AI PROCESSING
        dept = predict_dept(body)
        sentiment, score = predict_sentiment(body)

        print(f"🧠 Dept: {dept} | Sentiment: {sentiment} | Score: {score}")

        # ✅ STORE IN DB
        cursor.execute(
            """INSERT INTO feedback 
            (text, department, sentiment, score, source) 
            VALUES (%s, %s, %s, %s, %s)""",
            (body, dept, sentiment, score, "email")
        )
        db.commit()

        # 🔥 IMPORTANT FIX (CLUSTERING)
        feedback_id = cursor.lastrowid

        # ✅ PASS TEXT ALSO (VERY IMPORTANT)
        create_case(feedback_id, dept, sentiment, body)

        # ✅ MARK AS SEEN
        mail.store(num, '+FLAGS', '\\Seen')

    mail.logout()
    print("✅ Done")