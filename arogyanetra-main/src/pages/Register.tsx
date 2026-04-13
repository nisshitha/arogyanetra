import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartPulse, Mail, Lock, Eye, EyeOff, Building2, Phone, MapPin, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const allDepartments = ["OPD", "Billing", "Pharmacy", "Nursing", "Facilities", "Emergency", "Radiology", "Laboratory"];

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDepts, setSelectedDepts] = useState<string[]>(["OPD", "Billing", "Pharmacy", "Nursing", "Facilities"]);
  const [customDept, setCustomDept] = useState("");
  const [customDepts, setCustomDepts] = useState<string[]>([]);
  const [slaHours, setSlaHours] = useState<Record<string, string>>(
    Object.fromEntries(allDepartments.map((d) => [d, "24"]))
  );

  const allAvailable = [...allDepartments, ...customDepts];
  const activeDepts = allAvailable.filter((d) => selectedDepts.includes(d));

  const toggleDept = (d: string) => {
    if (selectedDepts.includes(d)) {
      setSelectedDepts(selectedDepts.filter((x) => x !== d));
    } else {
      setSelectedDepts([...selectedDepts, d]);
      if (!slaHours[d]) setSlaHours({ ...slaHours, [d]: "24" });
    }
  };

  const addCustomDept = () => {
    const name = customDept.trim();
    if (name && !allAvailable.includes(name)) {
      setCustomDepts([...customDepts, name]);
      setSelectedDepts([...selectedDepts, name]);
      setSlaHours({ ...slaHours, [name]: "24" });
      setCustomDept("");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-[40%] gradient-primary relative flex-col justify-between p-10 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

        <div className="relative">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <HeartPulse className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block leading-tight">AAROGYA</span>
              <span className="font-bold text-lg tracking-tight block leading-tight">NETRA</span>
            </div>
          </Link>
        </div>

        <div className="relative space-y-6">
          <h2 className="text-3xl font-bold leading-tight">Register Your<br />Hospital</h2>
          <p className="text-white/70 max-w-xs leading-relaxed">
            Join 500+ healthcare institutions using our AI-powered feedback platform.
          </p>

          {/* Progress Steps */}
          <div className="space-y-4 mt-8">
            <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${step === 1 ? "bg-white/15 backdrop-blur-sm" : "opacity-60"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? "bg-white/30" : "bg-white/10"}`}>
                {step > 1 ? <CheckCircle className="h-4 w-4" /> : "1"}
              </div>
              <div>
                <p className="font-semibold text-sm">Account Setup</p>
                <p className="text-xs text-white/60">Create login credentials</p>
              </div>
            </div>
            <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${step === 2 ? "bg-white/15 backdrop-blur-sm" : "opacity-60"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? "bg-white/30" : "bg-white/10"}`}>2</div>
              <div>
                <p className="font-semibold text-sm">Hospital Details</p>
                <p className="text-xs text-white/60">Configure departments & SLA</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative text-sm text-white/50">
          © 2024 Aarogya Netra
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-start justify-center p-6 bg-background overflow-y-auto">
        <div className="w-full max-w-xl py-8 animate-slide-up">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 justify-center mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-lg gradient-btn flex items-center justify-center">
              <HeartPulse className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">AAROGYA <span className="text-primary">NETRA</span></span>
          </Link>

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-primary">Step 1 of 2</p>
                <h2 className="text-2xl font-bold mt-1">Account Setup</h2>
                <p className="text-sm text-muted-foreground mt-1">Create your hospital login credentials</p>
              </div>

              {/* Section A */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">A</span>
                  <span className="font-semibold text-sm">Hospital Account</span>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Hospital Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="email" placeholder="admin@hospital.com" className="pl-10 h-11 rounded-xl" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Create Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-11 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                className="w-full h-11 rounded-xl gradient-btn text-primary-foreground border-0 hover-lift gap-2 font-semibold"
                onClick={() => setStep(2)}
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-primary">Step 2 of 2</p>
                <h2 className="text-2xl font-bold mt-1">Hospital Details</h2>
                <p className="text-sm text-muted-foreground mt-1">Configure your hospital information and SLA settings</p>
              </div>

              {/* Hospital Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Hospital Name</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="City General Hospital" className="pl-10 h-11 rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="+91 98765 43210" className="pl-10 h-11 rounded-xl" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="123 Healthcare Boulevard, Medical District" className="pl-10 h-11 rounded-xl" />
                </div>
              </div>

              {/* Department Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Select Departments</Label>
                <div className="flex flex-wrap gap-2">
                  {allAvailable.map((d) => (
                    <button
                      key={d}
                      onClick={() => toggleDept(d)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                        selectedDepts.includes(d)
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border bg-card text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {selectedDepts.includes(d) && <span className="mr-1.5">✓</span>}
                      {d}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Type department name & press Enter"
                    value={customDept}
                    onChange={(e) => setCustomDept(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addCustomDept()}
                    className="flex-1 h-10 rounded-xl"
                  />
                  <Button variant="outline" size="sm" onClick={addCustomDept} className="rounded-xl h-10 px-4">
                    + Add
                  </Button>
                </div>
              </div>

              {/* SLA Configuration */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-sm font-semibold">SLA Configuration (Hours)</Label>
                </div>
                <div className="rounded-xl border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">Department</th>
                        <th className="text-left px-4 py-3 font-medium text-muted-foreground">SLA Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeDepts.map((d) => (
                        <tr key={d} className="border-t hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3 font-medium">{d}</td>
                          <td className="px-4 py-3">
                            <Input
                              type="number"
                              value={slaHours[d] || "24"}
                              onChange={(e) => setSlaHours({ ...slaHours, [d]: e.target.value })}
                              className="w-20 h-9 rounded-lg text-center"
                            />
                          </td>
                        </tr>
                      ))}
                      {activeDepts.length === 0 && (
                        <tr>
                          <td colSpan={2} className="px-4 py-6 text-center text-muted-foreground">Select departments above to configure SLA</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-11 rounded-xl">
                  Back
                </Button>
                <Button
                  className="flex-1 h-11 rounded-xl gradient-btn text-primary-foreground border-0 hover-lift gap-2 font-semibold"
                  onClick={() => navigate("/dashboard")}
                >
                  Complete Registration <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
