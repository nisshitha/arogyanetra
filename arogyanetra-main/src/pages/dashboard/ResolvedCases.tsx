import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export interface ResolvedCase {
  id: string;
  caseId: string;
  department: string;
  title: string;
  resolvedDate: string;
  state: "Stable" | "Positive Reinforcement" | "Recurring Issue" | "Negative Spike";
  newComplaints: number;
  sentimentChange: number;
  hasSpikeWarning: boolean;
  sentimentData: { day: string; score: number }[];
}

const stateStyle = (s: string) => {
  if (s === "Stable") return "bg-success/15 text-success";
  if (s === "Positive Reinforcement") return "bg-primary/15 text-primary";
  if (s === "Recurring Issue") return "bg-warning/15 text-warning-foreground";
  return "bg-destructive/15 text-destructive";
};

const caseBorder = (c: ResolvedCase) => {
  if (c.state === "Negative Spike") return "border-l-destructive";
  if (c.state === "Recurring Issue") return "border-l-warning";
  if (c.state === "Positive Reinforcement") return "border-l-success";
  return "border-l-primary";
};

const ResolvedCases = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [cases] = useState<ResolvedCase[]>([]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Resolved Case Monitoring</h1>
        <p className="text-sm text-muted-foreground mt-1">14-day post-resolution tracking.</p>
      </div>

      {cases.length > 0 ? (
        <div className="space-y-3">
          {cases.map((c) => (
            <div key={c.id} className={`bg-card rounded-xl border border-l-4 ${caseBorder(c)} shadow-sm overflow-hidden hover:shadow-md transition-shadow`}>
              <button
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{c.title}</h3>
                    {c.hasSpikeWarning && <AlertTriangle className="h-3.5 w-3.5 text-warning" />}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{c.caseId}</span>
                    <span>{c.department}</span>
                    <span>Resolved: {c.resolvedDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <Badge variant="outline" className={stateStyle(c.state)}>{c.state}</Badge>
                  {expanded === c.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </div>
              </button>

              {expanded === c.id && (
                <div className="border-t px-5 py-5 space-y-4 bg-muted/20">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-card rounded-lg border p-3 text-center">
                      <p className="text-[11px] text-muted-foreground">New Complaints</p>
                      <p className={`text-lg font-bold ${c.newComplaints > 0 ? "text-destructive" : "text-success"}`}>{c.newComplaints}</p>
                    </div>
                    <div className="bg-card rounded-lg border p-3 text-center">
                      <p className="text-[11px] text-muted-foreground">Sentiment Change</p>
                      <p className={`text-lg font-bold flex items-center justify-center gap-1 ${c.sentimentChange >= 0 ? "text-success" : "text-destructive"}`}>
                        {c.sentimentChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {c.sentimentChange > 0 ? "+" : ""}{c.sentimentChange}%
                      </p>
                    </div>
                    <div className="bg-card rounded-lg border p-3 text-center">
                      <p className="text-[11px] text-muted-foreground">Spike Detection</p>
                      <p className="text-sm font-semibold flex items-center justify-center gap-1">
                        {c.hasSpikeWarning ? (
                          <><AlertTriangle className="h-4 w-4 text-warning" /> Detected</>
                        ) : (
                          <><CheckCircle2 className="h-4 w-4 text-success" /> Clear</>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="bg-card rounded-lg border p-4">
                    <p className="text-xs font-medium text-muted-foreground mb-3">Sentiment Trajectory (14 days)</p>
                    <ResponsiveContainer width="100%" height={160}>
                      <LineChart data={c.sentimentData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 18% 90%)" />
                        <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                        <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke={c.sentimentChange >= 0 ? "hsl(152 50% 45%)" : "hsl(0 65% 60%)"}
                          strokeWidth={2}
                          dot={{ r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl border shadow-sm p-12 text-center">
          <p className="text-muted-foreground text-sm">No resolved cases available. Connect backend to load resolution data.</p>
        </div>
      )}
    </div>
  );
};

export default ResolvedCases;
