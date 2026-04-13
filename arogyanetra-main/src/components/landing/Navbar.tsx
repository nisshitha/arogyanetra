import { Link } from "react-router-dom";
import { HeartPulse, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center">
            <HeartPulse className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground tracking-tight">AAROGYA <span className="text-primary">NETRA</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <a href="#problem" className="text-sm text-muted-foreground hover:text-primary transition-colors">Problem</a>
          <a href="#solution" className="text-sm text-muted-foreground hover:text-primary transition-colors">Solution</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">How It Works</a>
          <Link to="/login">
            <Button variant="ghost" size="sm" className="font-semibold hover:text-primary">Login</Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="gradient-btn text-primary-foreground border-0 hover-lift">Register Hospital</Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t glass p-4 flex flex-col gap-3 animate-fade-in">
          <a href="#problem" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Problem</a>
          <a href="#solution" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>Solution</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground" onClick={() => setOpen(false)}>How It Works</a>
          <Link to="/login"><Button variant="ghost" size="sm" className="w-full">Login</Button></Link>
          <Link to="/register"><Button size="sm" className="w-full gradient-btn text-primary-foreground border-0">Register Hospital</Button></Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
