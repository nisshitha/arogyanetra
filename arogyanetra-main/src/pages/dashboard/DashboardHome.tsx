import { useState } from "react";
import { MessageSquare, Briefcase, AlertTriangle, ArrowRight, TrendingDown, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export interface StatCard {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  borderColor: string;
}

export interface SpikeAlert {
  text: string;
  dept: string;
}

const DashboardHome = () => {
  const whatsappNumber = "+1 (415) 523-8886";

  const [stats] = useState<StatCard[]>([]);
  const [alerts] = useState<SpikeAlert[]>([]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.length > 0 ? stats.map((s) => (
          <div key={s.label} className={`bg-card rounded-xl border border-l-4 ${s.borderColor} shadow-sm p-5 flex items-center gap-4 cursor-default hover:shadow-md transition-shadow`}>
            <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center">
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        )) : (
          <>
            {[
              { label: "Total Feedback", icon: MessageSquare, color: "text-primary", borderColor: "border-l-primary" },
              { label: "Active Departments", icon: Building2, color: "text-secondary-foreground", borderColor: "border-l-secondary" },
              { label: "Open Cases", icon: Briefcase, color: "text-warning-foreground", borderColor: "border-l-warning" },
              { label: "SLA Breaches", icon: AlertTriangle, color: "text-destructive", borderColor: "border-l-destructive" },
            ].map((s) => (
              <div key={s.label} className={`bg-card rounded-xl border border-l-4 ${s.borderColor} shadow-sm p-5 flex items-center gap-4 cursor-default`}>
                <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center">
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-muted-foreground">--</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* WhatsApp Bot Card */}
      <div className="bg-card rounded-xl border border-l-4 border-l-success shadow-sm p-5 flex items-center gap-4">
        <div className="w-11 h-11 rounded-lg bg-success/10 flex items-center justify-center">
          <MessageSquare className="h-5 w-5 text-success" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">Your Hospital WhatsApp Bot</p>
          <p className="text-sm text-muted-foreground">{whatsappNumber}</p>
          <p className="text-xs text-primary mt-0.5">Patients and guardians can send feedback directly to this number. All messages are automatically analyzed and routed.</p>
        </div>
      </div>

      {/* Sentiment Spike Alerts */}
      <div className="bg-card rounded-xl border border-l-4 border-l-warning shadow-sm p-5 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-warning" />
          Sentiment Spike Alerts
        </h2>
        {alerts.length > 0 ? (
          <div className="space-y-3">
            {alerts.map((a, i) => (
              <div key={i} className="bg-warning/10 rounded-lg p-3 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2">
                  <TrendingDown className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground">{a.text}</p>
                </div>
                <Link to={`/dashboard/cases?dept=${a.dept}`}>
                  <Button variant="outline" size="sm" className="shrink-0 gap-1">
                    View & Take Action <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No active alerts. Connect backend to receive real-time spike notifications.</p>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link to="/dashboard/departments" className="bg-card rounded-xl border border-l-4 border-l-primary shadow-sm p-4 hover:shadow-md transition-shadow group">
          <Building2 className="h-5 w-5 text-primary mb-2" />
          <p className="font-semibold text-sm">Department Grid</p>
          <p className="text-xs text-muted-foreground mt-1">View all department risk levels</p>
          <span className="text-xs text-primary mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Open <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
        <Link to="/dashboard/feedback" className="bg-card rounded-xl border border-l-4 border-l-success shadow-sm p-4 hover:shadow-md transition-shadow group">
          <MessageSquare className="h-5 w-5 text-primary mb-2" />
          <p className="font-semibold text-sm">Live Feed</p>
          <p className="text-xs text-muted-foreground mt-1">Real-time feedback from all channels</p>
          <span className="text-xs text-primary mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Open <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
        <Link to="/dashboard/predictive" className="bg-card rounded-xl border border-l-4 border-l-secondary shadow-sm p-4 hover:shadow-md transition-shadow group">
          <Briefcase className="h-5 w-5 text-primary mb-2" />
          <p className="font-semibold text-sm">Predictive Intel</p>
          <p className="text-xs text-muted-foreground mt-1">Forecast risks and recurring issues</p>
          <span className="text-xs text-primary mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Open <ArrowRight className="h-3 w-3" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
