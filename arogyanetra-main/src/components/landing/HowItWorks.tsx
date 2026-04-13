import { MessageSquare, Brain, AlertTriangle, RefreshCw, ChevronRight } from "lucide-react";

const steps = [
  { number: "01", title: "Collect Feedback", description: "Patients send feedback via WhatsApp, email, or in-app.", icon: MessageSquare },
  { number: "02", title: "AI Sentiment Analysis", description: "NLP engine classifies sentiment in real time.", icon: Brain },
  { number: "03", title: "Issue Detection", description: "Negative feedback clustered by department & issue type.", icon: AlertTriangle },
  { number: "04", title: "SLA Resolution", description: "Auto-assigned cases resolved within SLA timelines.", icon: RefreshCw },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 bg-accent/30">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 items-start">
        {steps.map((s, i) => (
          <div key={s.number} className="flex flex-col items-center text-center relative">
            <span className="text-xs font-bold text-primary tracking-widest mb-3">STEP {s.number}</span>
            <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-4 shadow-md">
              <s.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            {i < steps.length - 1 && (
              <ChevronRight className="hidden lg:block absolute right-0 top-12 translate-x-1/2 h-5 w-5 text-muted-foreground" />
            )}
            <h3 className="font-semibold text-base mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
