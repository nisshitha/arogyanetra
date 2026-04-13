import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, BarChart3, Bell, HeartPulse, ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-primary opacity-[0.03]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative">
        <div className="space-y-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary animate-bounce-subtle" />
            <span className="text-sm font-medium text-primary">AI-Powered Healthcare Platform</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <HeartPulse className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-primary tracking-tight">AAROGYA NETRA</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-foreground">
            Intelligent Patient <span className="text-primary">Feedback</span> & Resolution Engine
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Transform fragmented patient feedback into real-time, actionable service recovery workflows. Elevate patient satisfaction with AI-driven insights.
          </p>
          <div className="flex gap-3 pt-2">
            <Link to="/login">
              <Button size="lg" className="gap-2 gradient-btn text-primary-foreground border-0 hover-lift hover:shadow-lg">
                Hospital Login <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg" className="hover-lift">Register Hospital</Button>
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:block animate-slide-up-delay-2">
          <div className="bg-accent/40 rounded-2xl p-8 relative border border-primary/10">
            <div className="space-y-4">
              <div className="bg-card rounded-xl p-4 shadow-sm border hover-lift cursor-default flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Case Resolved</p>
                  <p className="text-xs text-muted-foreground">OPD Waiting Time — 3 complaints addressed</p>
                </div>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-sm border hover-lift cursor-default flex items-center gap-3" style={{ animationDelay: "200ms" }}>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Real-Time Feedback Analysis</p>
                  <p className="text-xs text-muted-foreground">12 new feedbacks processed today</p>
                </div>
              </div>
              <div className="bg-card rounded-xl p-4 shadow-sm border hover-lift cursor-default flex items-center gap-3" style={{ animationDelay: "400ms" }}>
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Spike Alert</p>
                  <p className="text-xs text-muted-foreground">Billing complaints up 40% this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
