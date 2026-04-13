import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartPulse, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-[45%] gradient-primary relative flex-col justify-between p-10 text-primary-foreground overflow-hidden">
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

        <div className="relative space-y-4">
          <h2 className="text-3xl font-bold leading-tight">Welcome Back to<br />Your Dashboard</h2>
          <p className="text-white/70 max-w-sm leading-relaxed">
            Access your hospital's intelligent feedback management system. Monitor patient sentiment, track cases, and resolve issues in real-time.
          </p>
        </div>

        <div className="relative text-sm text-white/50">
          © 2024 Aarogya Netra. All rights reserved.
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 justify-center mb-8 lg:hidden">
            <div className="w-9 h-9 rounded-lg gradient-btn flex items-center justify-center">
              <HeartPulse className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">AAROGYA <span className="text-primary">NETRA</span></span>
          </Link>

          <div className="glass rounded-2xl border shadow-lg p-8">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="w-full mb-6 bg-muted rounded-xl p-1">
                <TabsTrigger value="login" className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">Login</TabsTrigger>
                <TabsTrigger value="register" className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-5">
                <div className="text-center mb-2">
                  <h2 className="text-xl font-bold">Sign In</h2>
                  <p className="text-sm text-muted-foreground mt-1">Access your hospital dashboard</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Hospital Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="email" placeholder="admin@hospital.com" className="pl-10 h-11 rounded-xl border-input focus:border-primary focus:ring-primary/20" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-11 rounded-xl border-input focus:border-primary focus:ring-primary/20"
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

                <Button
                  className="w-full h-11 rounded-xl gradient-btn text-primary-foreground border-0 hover-lift gap-2 font-semibold"
                  onClick={() => navigate("/dashboard")}
                >
                  Login → Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <div className="text-center mb-2">
                  <h2 className="text-xl font-bold">Get Started</h2>
                  <p className="text-sm text-muted-foreground mt-1">Create a new hospital account</p>
                </div>
                <Button
                  className="w-full h-11 rounded-xl gradient-btn text-primary-foreground border-0 hover-lift gap-2 font-semibold"
                  onClick={() => navigate("/register")}
                >
                  Start Registration <ArrowRight className="h-4 w-4" />
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
