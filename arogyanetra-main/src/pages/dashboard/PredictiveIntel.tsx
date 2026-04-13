import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingUp, ArrowUp, Clock, Repeat, Zap } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export interface ForecastPoint {
  day: string;
  predicted: number;
  actual: number | null;
}

export interface RiskEntry {
  dept: string;
  risk: number;
  level: "High" | "Medium" | "Low";
  surge: boolean;
}

export interface RecurringPattern {
  pattern: string;
  department: string;
  frequency: string;
  mitigation: string;
}

export interface Anomaly {
  title: string;
  description: string;
  severity: "High" | "Medium" | "Low";
}

export interface PersistentProblem {
  issue: string;
  department: string;
  days: number;
}

export interface SurgeProbability {
  dept: string;
  probability: number;
}

const riskColor = (l: string) => {
  if (l === "High") return "bg-destructive/10 text-destructive";
  if (l === "Medium") return "bg-warning/10 text-warning-foreground";
  return "bg-success/10 text-success";
};

const PredictiveIntel = () => {
  const [forecastData] = useState<ForecastPoint[]>([]);
  const [riskRanking] = useState<RiskEntry[]>([]);
  const [recurringPatterns] = useState<RecurringPattern[]>([]);
  const [anomalies] = useState<Anomaly[]>([]);
  const [persistentProblems] = useState<PersistentProblem[]>([]);
  const [surgeProbabilities] = useState<SurgeProbability[]>([]);

  const EmptyState = ({ text }: { text: string }) => (
    <div className="py-8 text-center">
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Predictive Intelligence Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Forecasting operational risks and recurring patterns.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Complaint Forecast */}
        <div className="bg-card rounded-xl border shadow-sm p-5">
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Complaint Forecast — Next 7 Days
          </h3>
          {forecastData.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(200 15% 90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="predicted" stroke="hsl(184 65% 35%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Predicted" />
                <Line type="monotone" dataKey="actual" stroke="hsl(210 60% 55%)" strokeWidth={2} dot={{ r: 3 }} name="Actual" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState text="No forecast data available." />
          )}
        </div>

        {/* Top Growing Issue */}
        <div className="bg-card rounded-xl border shadow-sm p-5">
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <ArrowUp className="h-4 w-4 text-destructive" />
            Top Growing Issue
          </h3>
          <EmptyState text="No growing issues detected. Connect backend for analysis." />
        </div>
      </div>

      {/* Department Risk Ranking */}
      <div className="bg-card rounded-xl border shadow-sm p-5">
        <h3 className="font-semibold text-sm mb-4">Department Risk Ranking</h3>
        {riskRanking.length > 0 ? (
          <div className="space-y-2">
            {riskRanking.map((d, i) => (
              <div key={d.dept} className="flex items-center gap-3 py-2">
                <span className="text-xs text-muted-foreground w-5">{i + 1}</span>
                <span className="text-sm font-medium w-28">{d.dept}</span>
                <Progress value={d.risk} className="h-2 flex-1" />
                <span className="text-xs font-medium w-8 text-right">{d.risk}</span>
                <Badge variant="outline" className={`text-[10px] w-16 justify-center ${riskColor(d.level)}`}>{d.level}</Badge>
                {d.surge && <Zap className="h-3.5 w-3.5 text-warning animate-pulse" />}
              </div>
            ))}
          </div>
        ) : (
          <EmptyState text="No risk data available." />
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recurring Issues */}
        <div className="bg-card rounded-xl border shadow-sm p-5">
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <Repeat className="h-4 w-4 text-warning" />
            Recurring Issue Detection
          </h3>
          {recurringPatterns.length > 0 ? (
            <div className="space-y-3">
              {recurringPatterns.map((p, i) => (
                <div key={i} className="bg-muted/30 rounded-lg border p-3 space-y-1.5">
                  <p className="text-sm font-medium">{p.pattern}</p>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span>{p.department}</span>
                    <span>Frequency: {p.frequency}</span>
                  </div>
                  <p className="text-[11px] text-primary">💡 {p.mitigation}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="No recurring patterns detected." />
          )}
        </div>

        {/* Anomaly Detection */}
        <div className="bg-card rounded-xl border shadow-sm p-5">
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            Anomaly Detection
          </h3>
          {anomalies.length > 0 ? (
            <div className="space-y-3">
              {anomalies.map((a, i) => (
                <div key={i} className="bg-destructive/5 rounded-lg border border-destructive/20 p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{a.title}</p>
                    <Badge variant="outline" className={riskColor(a.severity)}>{a.severity}</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{a.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="No anomalies detected." />
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Persistent Problems */}
        <div className="bg-card rounded-xl border shadow-sm p-5">
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Persistent Problem Panel
          </h3>
          {persistentProblems.length > 0 ? (
            <div className="space-y-2">
              {persistentProblems.map((p, i) => (
                <div key={i} className="flex items-center justify-between bg-muted/30 rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{p.issue}</p>
                    <p className="text-[11px] text-muted-foreground">{p.department}</p>
                  </div>
                  <Badge variant="outline" className="bg-destructive/10 text-destructive">{p.days} days</Badge>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="No persistent problems tracked." />
          )}
        </div>

        {/* Surge Probability */}
        <div className="bg-card rounded-xl border shadow-sm p-5">
          <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
            <Zap className="h-4 w-4 text-warning" />
            Surge Probability Cards
          </h3>
          {surgeProbabilities.length > 0 ? (
            <div className="space-y-2">
              {surgeProbabilities.map((s) => (
                <div key={s.dept} className="flex items-center gap-3 py-2">
                  <span className="text-sm font-medium w-28">{s.dept}</span>
                  <Progress
                    value={s.probability}
                    className={`h-2.5 flex-1 ${s.probability >= 70 ? "[&>div]:bg-destructive" : s.probability >= 50 ? "[&>div]:bg-warning" : "[&>div]:bg-success"}`}
                  />
                  <span className={`text-xs font-bold w-10 text-right ${s.probability >= 70 ? "text-destructive" : s.probability >= 50 ? "text-warning-foreground" : "text-success"}`}>
                    {s.probability}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="No surge probability data available." />
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictiveIntel;
