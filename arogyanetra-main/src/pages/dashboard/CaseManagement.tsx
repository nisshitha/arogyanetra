import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, AlertTriangle, ArrowLeft, Play, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

export interface FeedbackMessage {
  source: string;
  language: string;
  time: string;
  text: string;
  translated?: string;
  sentimentScore: number;
}

export interface Cluster {
  id: string;
  caseId: string;
  title: string;
  department: string;
  deptId: string;
  priority: "High" | "Medium";
  status: "Open" | "In Progress" | "Resolved" | "SLA Breached";
  hasSurge: boolean;
  complaintCount: number;
  slaSeconds: number;
  slaRunning: boolean;
  sentimentScore: number;
  slaStatus: string;
  timeline: ("Detected" | "Case Created" | "Action Taken" | "Resolved")[];
  messages: FeedbackMessage[];
}

const formatTime = (seconds: number) => {
  if (seconds <= 0) return "0h 0m";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${h}h ${m}m`;
};

const statusColor = (s: string) => {
  if (s === "Open") return "bg-secondary/50 text-secondary-foreground";
  if (s === "In Progress") return "bg-warning/15 text-warning-foreground";
  if (s === "SLA Breached") return "bg-destructive/15 text-destructive";
  return "bg-success/15 text-success";
};

const priorityColor = (p: string) => {
  if (p === "High") return "bg-destructive/10 text-destructive";
  return "bg-warning/15 text-warning-foreground";
};

const clusterBorder = (c: Cluster) => {
  if (c.status === "SLA Breached") return "border-l-destructive";
  if (c.priority === "High" && c.hasSurge) return "border-l-destructive";
  if (c.priority === "High") return "border-l-destructive/60";
  if (c.status === "In Progress") return "border-l-warning";
  return "border-l-primary";
};

const timelineSteps: ("Detected" | "Case Created" | "Action Taken" | "Resolved")[] = ["Detected", "Case Created", "Action Taken", "Resolved"];

const CaseManagement = () => {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const deptFilter = searchParams.get("dept");

  // SLA countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setClusters(prev => prev.map(c => {
        if (c.status === "Resolved" || c.status === "SLA Breached") return c;
        if (!c.slaRunning) return c;
        const newSeconds = c.slaSeconds - 1;
        if (newSeconds <= 0) {
          return { ...c, slaSeconds: 0, status: "SLA Breached" as const, slaStatus: "Breached" };
        }
        return {
          ...c,
          slaSeconds: newSeconds,
          slaStatus: newSeconds < 3600 ? "At Risk" : "On Track",
        };
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = useCallback((id: string) => {
    setClusters(prev => prev.map(c => {
      if (c.id !== id) return c;
      if (c.status === "Open" && c.timeline.includes("Case Created")) {
        return {
          ...c,
          status: "In Progress" as const,
          timeline: [...c.timeline, "Action Taken" as const],
          slaRunning: true,
        };
      }
      return c;
    }));
  }, []);

  const handleResolve = useCallback((id: string) => {
    setClusters(prev => prev.map(c => {
      if (c.id !== id) return c;
      if (c.status === "In Progress" && c.timeline.includes("Action Taken")) {
        return {
          ...c,
          status: "Resolved" as const,
          timeline: [...c.timeline, "Resolved" as const],
          slaStatus: "Resolved",
          slaRunning: false,
        };
      }
      return c;
    }));
  }, []);

  const filtered = deptFilter
    ? clusters.filter((c) => c.deptId === deptFilter)
    : clusters;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Case Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Negative feedback clusters grouped by detected issues.</p>
        </div>
      </div>

      {deptFilter && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary">
            Filtered: {deptFilter}
          </Badge>
          <Button variant="ghost" size="sm" className="text-xs h-7" onClick={() => navigate("/dashboard/cases")}>
            Clear filter
          </Button>
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((c) => (
            <div key={c.id} className={`bg-card rounded-xl border border-l-4 ${clusterBorder(c)} shadow-sm overflow-hidden hover:shadow-md transition-shadow`}>
              <button
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
                onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-sm">{c.title}</h3>
                    {c.hasSurge && (
                      <Badge variant="outline" className="bg-destructive/10 text-destructive text-[10px] px-1.5 py-0 animate-pulse">
                        <AlertTriangle className="h-3 w-3 mr-0.5" /> SPIKE
                      </Badge>
                    )}
                    {c.status === "SLA Breached" && (
                      <Badge variant="outline" className="bg-destructive/15 text-destructive text-[10px] px-1.5 py-0">
                        <XCircle className="h-3 w-3 mr-0.5" /> SLA BREACHED
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                    <span>{c.department}</span>
                    <span>{c.caseId}</span>
                    <span>Complaints: {c.complaintCount}</span>
                    <span className={c.slaSeconds < 3600 && c.status !== "Resolved" && c.status !== "SLA Breached" ? "text-destructive font-medium" : ""}>
                      SLA: {c.status === "Resolved" ? "Resolved" : c.status === "SLA Breached" ? "Breached" : formatTime(c.slaSeconds)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <Badge variant="outline" className={priorityColor(c.priority)}>{c.priority}</Badge>
                  <Badge variant="outline" className={statusColor(c.status)}>{c.status}</Badge>
                  {expanded === c.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </div>
              </button>

              {expanded === c.id && (
                <div className="border-t px-5 py-5 space-y-5 bg-muted/20">
                  {/* Timeline */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Case Lifecycle</p>
                    <div className="flex items-center gap-0 flex-wrap">
                      {timelineSteps.map((step, i) => {
                        const reached = c.timeline.includes(step);
                        return (
                          <div key={step} className="flex items-center">
                            <div className={`px-3 py-1.5 rounded-full text-[11px] font-medium border ${reached ? "bg-primary/15 text-primary border-primary/30" : "bg-muted text-muted-foreground border-border"}`}>
                              {step}
                            </div>
                            {i < timelineSteps.length - 1 && (
                              <div className={`w-6 h-px ${reached && c.timeline.includes(timelineSteps[i + 1]) ? "bg-primary/40" : "bg-border"}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Case Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-card rounded-lg border p-3">
                      <p className="text-[11px] text-muted-foreground">Case ID</p>
                      <p className="text-sm font-semibold">{c.caseId}</p>
                    </div>
                    <div className="bg-card rounded-lg border p-3">
                      <p className="text-[11px] text-muted-foreground">Department</p>
                      <p className="text-sm font-semibold">{c.department}</p>
                    </div>
                    <div className="bg-card rounded-lg border p-3">
                      <p className="text-[11px] text-muted-foreground">SLA Status</p>
                      <p className={`text-sm font-semibold ${c.slaStatus === "At Risk" || c.slaStatus === "Breached" ? "text-destructive" : "text-success"}`}>{c.slaStatus}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {c.status !== "Resolved" && c.status !== "SLA Breached" && (
                    <div className="flex items-center gap-3">
                      {c.status === "Open" && c.timeline.includes("Case Created") && (
                        <Button size="sm" className="gap-1.5" onClick={() => handleAction(c.id)}>
                          <Play className="h-3.5 w-3.5" /> Mark Action Taken
                        </Button>
                      )}
                      {c.status === "In Progress" && c.timeline.includes("Action Taken") && (
                        <Button size="sm" variant="outline" className="gap-1.5 border-success text-success hover:bg-success/10" onClick={() => handleResolve(c.id)}>
                          <CheckCircle2 className="h-3.5 w-3.5" /> Mark Resolved
                        </Button>
                      )}
                      {c.slaRunning && (
                        <span className={`text-xs font-medium ${c.slaSeconds < 3600 ? "text-destructive" : "text-muted-foreground"}`}>
                          ⏱ SLA Timer: {formatTime(c.slaSeconds)}
                        </span>
                      )}
                    </div>
                  )}

                  {c.status === "SLA Breached" && (
                    <div className="bg-destructive/10 rounded-lg p-3 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium text-destructive">SLA Breached — Resolution time exceeded.</span>
                    </div>
                  )}

                  {/* Messages */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">Feedback Messages ({c.messages.length})</p>
                    <div className="space-y-2">
                      {c.messages.map((m, i) => (
                        <div key={i} className="bg-card rounded-lg border p-3 space-y-2">
                          <div className="flex items-center gap-2 text-xs flex-wrap">
                            <Badge variant="outline" className="text-[10px]">{m.source}</Badge>
                            <Badge variant="outline" className="text-[10px] bg-muted">{m.language}</Badge>
                            <span className="text-muted-foreground ml-auto">{m.time}</span>
                          </div>
                          <p className="text-sm">{m.text}</p>
                          {m.translated && (
                            <p className="text-xs text-muted-foreground italic">→ {m.translated}</p>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-muted-foreground">Sentiment</span>
                            <Progress value={m.sentimentScore} className="h-1.5 flex-1 [&>div]:bg-destructive" />
                            <span className="text-[10px] font-medium text-destructive">{m.sentimentScore}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl border shadow-sm p-12 text-center">
          <p className="text-muted-foreground text-sm">No cases available. Connect backend to load case clusters.</p>
        </div>
      )}
    </div>
  );
};

export default CaseManagement;
