import { MessageCircle, Brain, AlertTriangle, ClipboardCheck } from "lucide-react";

const solutions = [
  { icon: MessageCircle, title: "Multi-Channel Feedback Collection", description: "Aggregate feedback from WhatsApp, email, web forms, and more into one stream." },
  { icon: Brain, title: "Sentiment Detection", description: "Automatically detect negative, neutral, and positive sentiment from patient messages." },
  { icon: AlertTriangle, title: "Negative Spike Alerts", description: "Get instant alerts when complaint volumes spike for any department." },
  { icon: ClipboardCheck, title: "SLA Case Management", description: "Auto-create cases for negative feedback with SLA tracking per department." },
];

const SolutionSection = () => (
  <section id="solution" className="py-20 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
    <div className="container mx-auto px-4 relative">
      <div className="text-center mb-12 animate-slide-up">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">What We Offer</span>
        <h2 className="text-3xl font-bold mt-2">The Solution</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {solutions.map((s, i) => (
          <div
            key={s.title}
            className={`bg-card rounded-xl p-6 border shadow-sm space-y-3 text-center hover-lift hover-glow cursor-default group animate-slide-up-delay-${i + 1}`}
          >
            <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <s.icon className="h-7 w-7 text-primary group-hover:animate-bounce-subtle" />
            </div>
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionSection;
