import { Badge } from "@/components/ui/badge";

const feedbacks = [
  {
    id: 1,
    source: "WhatsApp",
    language: "Tanglish",
    time: "10 mins ago",
    text: "OPD la romba neram wait pannenom. Doctor 2 hours late ah vandhar.",
    department: "OPD",
    sentiment: "negative",
  },
  {
    id: 2,
    source: "Web Form",
    language: "English",
    time: "25 mins ago",
    text: "The billing counter was very slow today. I waited 45 minutes for discharge papers.",
    department: "Billing",
    sentiment: "negative",
  },
  {
    id: 3,
    source: "Email",
    language: "English",
    time: "1 hour ago",
    text: "Very happy with the nursing staff in ward 3. They were attentive and caring.",
    department: "Nursing",
    sentiment: "positive",
  },
  {
    id: 4,
    source: "WhatsApp",
    language: "Tamil",
    time: "2 hours ago",
    text: "மருந்துக்கடையில் மருந்து இல்லை என்று சொன்னார்கள். வெளியில் வாங்க வேண்டியதாயிற்று.",
    department: "Pharmacy",
    sentiment: "negative",
  },
  {
    id: 5,
    source: "Web Form",
    language: "English",
    time: "3 hours ago",
    text: "Washrooms on the second floor were not clean. Needs immediate attention.",
    department: "Facilities",
    sentiment: "negative",
  },
  {
    id: 6,
    source: "Email",
    language: "English",
    time: "4 hours ago",
    text: "Overall good experience. The doctor explained everything well. Thank you.",
    department: "OPD",
    sentiment: "positive",
  },
];

const sourceBadgeColor = (s: string) => {
  if (s === "WhatsApp") return "bg-success/20 text-success-foreground";
  if (s === "Email") return "bg-secondary text-secondary-foreground";
  return "bg-accent text-accent-foreground";
};

const FeedbackStream = () => {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Feedback Stream</h1>

      <div className="space-y-3">
        {feedbacks.map((f) => (
          <div key={f.id} className="bg-card rounded-xl border shadow-sm p-4 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className={sourceBadgeColor(f.source)}>{f.source}</Badge>
              <Badge variant="outline">{f.language}</Badge>
              <Badge variant="outline" className="bg-muted">{f.department}</Badge>
              <span className="text-xs text-muted-foreground ml-auto">{f.time}</span>
            </div>
            <p className="text-sm leading-relaxed">{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackStream;
