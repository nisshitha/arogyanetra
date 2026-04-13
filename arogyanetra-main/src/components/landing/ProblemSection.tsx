import { MessageSquareOff, Clock, Users } from "lucide-react";

const problems = [
  {
    icon: MessageSquareOff,
    title: "Scattered Feedback Channels",
    description: "Patient feedback comes from WhatsApp, email, forms, and in-person — with no unified view.",
  },
  {
    icon: Clock,
    title: "Delayed Insight Generation",
    description: "By the time issues are identified, patient trust is already lost and damage is done.",
  },
  {
    icon: Users,
    title: "No Department Accountability",
    description: "Without clear assignment, complaints fall through the cracks with no ownership or SLA tracking.",
  },
];

const ProblemSection = () => (
  <section id="problem" className="py-20 bg-card relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-destructive/5 rounded-full blur-3xl" />
    <div className="container mx-auto px-4 relative">
      <div className="text-center mb-12 animate-slide-up">
        <span className="text-sm font-semibold text-destructive/80 uppercase tracking-wider">Why It Matters</span>
        <h2 className="text-3xl font-bold mt-2">The Problem</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {problems.map((p, i) => (
          <div
            key={p.title}
            className={`bg-background rounded-xl p-6 border shadow-sm space-y-3 hover-lift hover-glow cursor-default group animate-slide-up-delay-${i + 1}`}
          >
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <p.icon className="h-6 w-6 text-destructive/80" />
            </div>
            <h3 className="font-semibold text-lg">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
