import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Departments from "./pages/dashboard/Departments";
import CaseManagement from "./pages/dashboard/CaseManagement";
import ResolvedCases from "./pages/dashboard/ResolvedCases";
import LiveFeedback from "./pages/dashboard/LiveFeedback";
import PredictiveIntel from "./pages/dashboard/PredictiveIntel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="departments" element={<Departments />} />
            <Route path="cases" element={<CaseManagement />} />
            <Route path="resolved" element={<ResolvedCases />} />
            <Route path="feedback" element={<LiveFeedback />} />
            <Route path="predictive" element={<PredictiveIntel />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
