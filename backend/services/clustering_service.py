from sentence_transformers import SentenceTransformer, util
from config.db_config import cursor, db

# Load model once
model = SentenceTransformer('all-MiniLM-L6-v2')


# ==============================
# TEXT PREPROCESSING
# ==============================
def preprocess(text):
    text = text.lower()

    # normalize common words
    text = text.replace("medicines", "medicine")
    text = text.replace("pharmacy", "pharma")
    text = text.replace("hospital", "")

    return text


# ==============================
# GET EMBEDDING
# ==============================
def get_embedding(text):
    return model.encode(preprocess(text), convert_to_tensor=True)


# ==============================
# FIND BEST CLUSTER
# ==============================
def get_existing_cluster(text, department):

    new_emb = get_embedding(text)

    cursor.execute(
        "SELECT id, title FROM issue_clusters WHERE department=%s",
        (department,)
    )
    clusters = cursor.fetchall()

    best_cluster = None
    best_score = 0

    for cluster_id, title in clusters:

        existing_emb = get_embedding(title)

        similarity = util.cos_sim(new_emb, existing_emb).item()

        print(f"Comparing with cluster {cluster_id}: {similarity}")

        if similarity > best_score:
            best_score = similarity
            best_cluster = cluster_id

    # 🔥 LOWER THRESHOLD (CRITICAL)
    if best_score > 0.35:
        return best_cluster

    return None
# ==============================
# CREATE NEW CLUSTER
# ==============================
def create_cluster(text, department):

    # Better title (first 10 words)
    title = " ".join(text.split()[:10])

    cursor.execute(
        "INSERT INTO issue_clusters (department, title) VALUES (%s, %s)",
        (department, title)
    )
    db.commit()

    return cursor.lastrowid


# ==============================
# MAIN CLUSTER FUNCTION
# ==============================
def assign_cluster(text, department):

    cluster_id = get_existing_cluster(text, department)

    if cluster_id:
        return cluster_id

    return create_cluster(text, department)