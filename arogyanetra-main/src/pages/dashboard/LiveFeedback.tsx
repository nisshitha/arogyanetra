import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp, TrendingUp, Star } from "lucide-react";

export interface FeedbackMessage {
  id: number;
  source: string;
  language: string;
  department: string;
  time: string;
  text: string;
  sentimentScore: number;
  sentiment: "positive" | "negative";
}

export interface PositiveInsight {
  department: string;
  insight: string;
}

const sourceBadgeColor = (s: string) => {
  if (s === "WhatsApp") return "bg-success/15 text-success";
  return "bg-secondary/50 text-secondary-foreground";
};

const MessageCard = ({ m }: { m: FeedbackMessage }) => (
  <div className="bg-card rounded-lg border p-3 space-y-2">
    <div className="flex items-center gap-2 flex-wrap">
      <Badge variant="outline" className={`text-[10px] ${sourceBadgeColor(m.source)}`}>{m.source}</Badge>
      <Badge variant="outline" className="text-[10px]">{m.language}</Badge>
      <Badge variant="outline" className="text-[10px] bg-muted">{m.department}</Badge>
      <span className="text-[10px] text-muted-foreground ml-auto">{m.time}</span>
    </div>
    <p className="text-sm leading-relaxed">{m.text}</p>
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-muted-foreground">Sentiment</span>
      <Progress
        value={m.sentimentScore}
        className={`h-1.5 flex-1 ${m.sentiment === "positive" ? "[&>div]:bg-success" : "[&>div]:bg-destructive"}`}
      />
      <span className={`text-[10px] font-medium ${m.sentiment === "positive" ? "text-success" : "text-destructive"}`}>{m.sentimentScore}%</span>
    </div>
  </div>
);

const LiveFeedback = () => {
  const [showPositive, setShowPositive] = useState(true);
  const [showNegative, setShowNegative] = useState(true);

  const [messages] = useState<FeedbackMessage[]>([]);
  const [insights] = useState<PositiveInsight[]>([]);

  const positiveMessages = messages.filter(m => m.sentiment === "positive");
  const negativeMessages = messages.filter(m => m.sentiment === "negative");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Live Feedback Stream</h1>
        <p className="text-sm text-muted-foreground mt-1">All incoming messages from WhatsApp and Email channels.</p>
      </div>

      {/* Positive Insights */}
      <div className="bg-card rounded-xl border shadow-sm p-4 space-y-3">
        <h2 className="font-semibold text-sm flex items-center gap-2">
          <Star className="h-4 w-4 text-success" />
          Positive Performance Insights
        </h2>
        {insights.length > 0 ? (
          <div className="grid sm:grid-cols-3 gap-3">
            {insights.map((pi, i) => (
              <div key={i} className="bg-success/5 rounded-lg border border-success/20 p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="h-3.5 w-3.5 text-success" />
                  <span className="text-xs font-semibold text-success">{pi.department}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{pi.insight}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No insights available. Connect backend to load performance data.</p>
        )}
      </div>

      {/* Two columns */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Positive */}
        <div className="space-y-3">
          <button onClick={() => setShowPositive(!showPositive)} className="flex items-center gap-2 w-full">
            <h2 className="font-semibold text-sm text-success">Positive Clusters ({positiveMessages.length})</h2>
            {showPositive ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          {showPositive && (
            positiveMessages.length > 0 ? (
              <div className="space-y-2">
                {positiveMessages.map(m => <MessageCard key={m.id} m={m} />)}
              </div>
            ) : (
              <div className="bg-card rounded-lg border p-6 text-center">
                <p className="text-sm text-muted-foreground">No positive feedback yet.</p>
              </div>
            )
          )}
        </div>

        {/* Negative */}
        <div className="space-y-3">
          <button onClick={() => setShowNegative(!showNegative)} className="flex items-center gap-2 w-full">
            <h2 className="font-semibold text-sm text-destructive">Negative Clusters ({negativeMessages.length})</h2>
            {showNegative ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          {showNegative && (
            negativeMessages.length > 0 ? (
              <div className="space-y-2">
                {negativeMessages.map(m => <MessageCard key={m.id} m={m} />)}
              </div>
            ) : (
              <div className="bg-card rounded-lg border p-6 text-center">
                <p className="text-sm text-muted-foreground">No negative feedback yet.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveFeedback;
