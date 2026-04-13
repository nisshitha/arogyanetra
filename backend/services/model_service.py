from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F

# ==============================
# LOAD MODELS (LOAD ONCE)
# ==============================

dept_tokenizer = AutoTokenizer.from_pretrained("models/dept_model")
dept_model = AutoModelForSequenceClassification.from_pretrained("models/dept_model")

sent_tokenizer = AutoTokenizer.from_pretrained("models/sentiment_model")
sent_model = AutoModelForSequenceClassification.from_pretrained("models/sentiment_model")

# ==============================
# LABELS
# ==============================

dept_labels = [
    "Administration", "Billing", "Housekeeping",
    "Laboratory", "Maintenance", "Nursing",
    "OPD", "Pharmacy"
]

sent_labels = ["Negative", "Neutral", "Positive"]

# ==============================
# SAFE TEXT PREPROCESSING
# ==============================

def clean_text(text):
    if not text:
        return ""
    return text.strip()[:1000]  # limit length to avoid crashes


# ==============================
# DEPARTMENT PREDICTION
# ==============================

def predict_dept(text):
    text = clean_text(text)

    inputs = dept_tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=512
    )

    with torch.no_grad():
        outputs = dept_model(**inputs)

    idx = torch.argmax(outputs.logits, dim=1).item()
    return dept_labels[idx]


# ==============================
# SENTIMENT PREDICTION
# ==============================

def predict_sentiment(text):
    text = clean_text(text)

    inputs = sent_tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=512
    )

    with torch.no_grad():
        outputs = sent_model(**inputs)

    probs = F.softmax(outputs.logits, dim=1)

    idx = torch.argmax(probs, dim=1).item()
    score = round(probs[0][idx].item(), 3)

    return sent_labels[idx], score