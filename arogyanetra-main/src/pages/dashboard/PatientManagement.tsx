import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const initialPatients = [
  { id: "P-1001", name: "Rajesh Kumar", phone: "+91 98765 43210", lastFeedback: "2 hours ago" },
  { id: "P-1002", name: "Priya Sharma", phone: "+91 87654 32109", lastFeedback: "5 hours ago" },
  { id: "P-1003", name: "Arun Patel", phone: "+91 76543 21098", lastFeedback: "1 day ago" },
  { id: "P-1004", name: "Lakshmi Devi", phone: "+91 65432 10987", lastFeedback: "2 days ago" },
  { id: "P-1005", name: "Mohammed Ali", phone: "+91 54321 09876", lastFeedback: "3 days ago" },
];

const PatientManagement = () => {
  const [patients] = useState(initialPatients);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Patient Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1"><Plus className="h-4 w-4" /> Add Patient</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Patient</DialogTitle></DialogHeader>
            <div className="space-y-3 pt-2">
              <div className="space-y-1"><Label>Name</Label><Input placeholder="Full name" /></div>
              <div className="space-y-1"><Label>Phone</Label><Input placeholder="+91 ..." /></div>
              <Button className="w-full">Add Patient</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Patient ID</th>
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">Phone</th>
              <th className="text-left px-4 py-3 font-medium">Last Feedback</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-t hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-mono text-xs">{p.id}</td>
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.phone}</td>
                <td className="px-4 py-3 text-muted-foreground">{p.lastFeedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientManagement;
