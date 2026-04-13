import { useState } from "react";
import { NavLink as RouterNavLink, useNavigate, useLocation } from "react-router-dom";
import { HeartPulse, LayoutDashboard, Building2, Briefcase, CheckCircle2, Radio, BrainCircuit, LogOut } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/departments", label: "Departments", icon: Building2 },
  { to: "/dashboard/cases", label: "Case Management", icon: Briefcase },
  { to: "/dashboard/resolved", label: "Resolved Cases", icon: CheckCircle2 },
  { to: "/dashboard/feedback", label: "Feedback Stream", icon: Radio },
  { to: "/dashboard/predictive", label: "Predictive Intel", icon: BrainCircuit },
];

export interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ collapsed, onToggle }: DashboardSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={`${collapsed ? "w-[72px]" : "w-64"} min-h-screen bg-sidebar flex flex-col shrink-0 transition-all duration-300 relative`}>
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-sidebar-border">
        <div className={`flex items-center gap-2.5 ${collapsed ? "justify-center w-full" : ""}`}>
          <div className="w-9 h-9 rounded-xl bg-primary/30 flex items-center justify-center shrink-0">
            <HeartPulse className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <span className="font-bold text-sidebar-foreground text-sm block">AAROGYA</span>
              <span className="font-bold text-sidebar-foreground text-sm block">NETRA</span>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 px-3 pt-4 space-y-1">
        {links.map((l) => {
          const active = l.to === "/dashboard"
            ? location.pathname === "/dashboard"
            : location.pathname.startsWith(l.to);
          return (
            <RouterNavLink
              key={l.to}
              to={l.to}
              end={l.to === "/dashboard"}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-200 group ${
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
              } ${collapsed ? "justify-center px-0" : ""}`}
              title={collapsed ? l.label : undefined}
            >
              <l.icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-sidebar-accent-foreground" : ""}`} />
              {!collapsed && <span>{l.label}</span>}
            </RouterNavLink>
          );
        })}
      </nav>

      <div className="px-3 pb-5 border-t border-sidebar-border pt-3">
        <button
          onClick={() => navigate("/")}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-sidebar-foreground/50 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground transition-all duration-200 w-full ${collapsed ? "justify-center px-0" : ""}`}
        >
          <LogOut className="h-[18px] w-[18px] shrink-0" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
