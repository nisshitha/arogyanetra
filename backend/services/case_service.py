from config.db_config import cursor, db
from datetime import datetime, timedelta
from services.clustering_service import assign_cluster


# ==============================
# CREATE CASE (ONLY IF NEGATIVE)
# ==============================
def create_case(feedback_id, department, sentiment, text):

    # ❌ Only negative feedback creates case
    if sentiment.lower() != "negative":
        return None

    # ==============================
    # STEP 1: GET CLUSTER (AI BASED)
    # ==============================
    cluster_id = assign_cluster(text, department)

    # ==============================
    # STEP 2: CHECK EXISTING CASE
    # ==============================
    cursor.execute(
        "SELECT id FROM cases WHERE cluster_id=%s",
        (cluster_id,)
    )
    result = cursor.fetchone()

    if result:
        # 🔁 Existing case → reuse
        case_id = result[0]

    else:
        # ==============================
        # STEP 3: CREATE NEW CASE
        # ==============================

        # 🔥 Get SLA hours
        cursor.execute(
            "SELECT sla_hours FROM sla_config WHERE department=%s",
            (department,)
        )
        sla_result = cursor.fetchone()
        sla_hours = sla_result[0] if sla_result else 24

        created_time = datetime.now()
        deadline = created_time + timedelta(hours=sla_hours)

        cursor.execute(
            """INSERT INTO cases 
            (feedback_id, department, priority, cluster_id, sla_deadline, status, created_at) 
            VALUES (%s, %s, %s, %s, %s, %s, %s)""",
            (feedback_id, department, "high", cluster_id, deadline, "open", created_time)
        )
        db.commit()

        case_id = cursor.lastrowid

    # ==============================
    # STEP 4: LINK FEEDBACK
    # ==============================
    cursor.execute(
        "UPDATE feedback SET case_id=%s, cluster_id=%s WHERE id=%s",
        (case_id, cluster_id, feedback_id)
    )
    db.commit()

    return case_id


# ==============================
# ACTION TAKEN → START SLA TIMER
# ==============================
def start_sla(case_id):

    # Get department
    cursor.execute("SELECT department FROM cases WHERE id=%s", (case_id,))
    result = cursor.fetchone()

    if not result:
        return

    department = result[0]

    # Get SLA hours
    cursor.execute(
        "SELECT sla_hours FROM sla_config WHERE department=%s",
        (department,)
    )
    sla_result = cursor.fetchone()
    sla_hours = sla_result[0] if sla_result else 24

    action_time = datetime.now()
    deadline = action_time + timedelta(hours=sla_hours)

    # Update case
    cursor.execute(
        """UPDATE cases 
        SET status='in_progress',
            action_taken_at=%s,
            sla_deadline=%s
        WHERE id=%s""",
        (action_time, deadline, case_id)
    )
    db.commit()


# ==============================
# RESOLVE CASE
# ==============================
def resolve_case(case_id):

    cursor.execute(
        """UPDATE cases 
        SET status='resolved',
            resolved_at=%s
        WHERE id=%s""",
        (datetime.now(), case_id)
    )
    db.commit()


# ==============================
# CHECK SLA BREACH (FOR FRONTEND)
# ==============================
def is_sla_breached(case):

    # Already resolved → no breach
    if case["status"] == "resolved":
        return False

    # No deadline → no breach
    if not case["sla_deadline"]:
        return False

    # Compare current time
    return datetime.now() > case["sla_deadline"]