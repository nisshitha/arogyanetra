import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle, ArrowRight, Minus } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export interface Department {
  id: string;
  name: string;
  shortName: string;
  issueCount: number;
  slaBreaches: number;
  sentimentTrend: "up" | "down" | "stable";
  hasSurge: boolean;
  totalFeedback: number;
  resolvedToday: number;
  recentSpike: string | null;
}

const trendIcon = (t: string) => {
  if (t === "up") return <TrendingUp className="h-4 w-4 text-success" />;
  if (t === "down") return <TrendingDown className="h-4 w-4 text-destructive" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

const borderColor = (dept: Department) => {
  if (dept.hasSurge) return "border-l-destructive";
  if (dept.slaBreaches > 0) return "border-l-warning";
  if (dept.sentimentTrend === "up") return "border-l-success";
  return "border-l-primary";
};

const Departments = () => {
  const navigate = useNavigate();
  const [departments] = useState<Department[]>([]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Department Intelligence Grid</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time operational risk across all departments.</p>
      </div>

      {departments.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {departments.map((dept) => (
            <HoverCard key={dept.id} openDelay={200} closeDelay={100}>
              <HoverCardTrigger asChild>
                <button
                  onClick={() => navigate(`/dashboard/cases?dept=${dept.id}`)}
                  className={`bg-card rounded-xl border border-l-4 ${borderColor(dept)} shadow-sm p-5 text-left hover:shadow-md hover:border-primary/30 transition-all duration-200 w-full group`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-sm">{dept.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{dept.shortName}</p>
                    </div>
                    {dept.hasSurge && (
                      <Badge variant="outline" className="bg-destructive/10 text-destructive text-[10px] px-1.5 py-0.5 animate-pulse">
                        SURGE
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Open Issues</span>
                      <span className="font-semibold">{dept.issueCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">SLA Breaches</span>
                      <span className={`font-semibold ${dept.slaBreaches > 0 ? "text-destructive" : "text-success"}`}>{dept.slaBreaches}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Sentiment</span>
                      {trendIcon(dept.sentimentTrend)}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t flex items-center justify-end text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    View Clusters <ArrowRight className="h-3 w-3 ml-1" />
                  </div>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-64 p-4 space-y-2" side="right">
                <p className="font-semibold text-sm">{dept.name} — Details</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">Total Feedback</span><span className="font-medium">{dept.totalFeedback}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Cases Resolved Today</span><span className="font-medium text-success">{dept.resolvedToday}</span></div>
                  {dept.recentSpike && (
                    <div className="bg-warning/10 rounded-md p-2 mt-2 flex items-start gap-1.5">
                      <AlertTriangle className="h-3 w-3 text-warning mt-0.5 shrink-0" />
                      <span className="text-warning-foreground text-[11px]">{dept.recentSpike}</span>
                    </div>
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl border shadow-sm p-12 text-center">
          <p className="text-muted-foreground text-sm">No departments available. Connect backend to load department data.</p>
        </div>
      )}
    </div>
  );
};

export default Departments;
