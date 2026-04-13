import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const deptData = [
  { department: "OPD", complaints: 42 },
  { department: "Billing", complaints: 28 },
  { department: "Pharmacy", complaints: 18 },
  { department: "Nursing", complaints: 8 },
  { department: "Facilities", complaints: 15 },
];

const sentimentTrend = [
  { day: "Mon", positive: 20, negative: 8 },
  { day: "Tue", positive: 18, negative: 12 },
  { day: "Wed", positive: 22, negative: 15 },
  { day: "Thu", positive: 16, negative: 20 },
  { day: "Fri", positive: 24, negative: 10 },
  { day: "Sat", positive: 14, negative: 6 },
  { day: "Sun", positive: 10, negative: 4 },
];

const slaBreaches = [
  { department: "OPD", breaches: 5 },
  { department: "Billing", breaches: 3 },
  { department: "Pharmacy", breaches: 2 },
  { department: "Nursing", breaches: 0 },
  { department: "Facilities", breaches: 1 },
];

const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold">Admin Analytics</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-l-4 border-l-primary shadow-sm p-5">
          <h3 className="font-display font-semibold mb-4">Department Complaint Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 18% 90%)" />
              <XAxis dataKey="department" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="complaints" fill="hsl(174 42% 55%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-l-4 border-l-success shadow-sm p-5">
          <h3 className="font-display font-semibold mb-4">Sentiment Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sentimentTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 18% 90%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="positive" stroke="hsl(152 50% 45%)" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="negative" stroke="hsl(0 65% 60%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-l-4 border-l-destructive shadow-sm p-5 lg:col-span-2">
          <h3 className="font-display font-semibold mb-4">SLA Breach Count by Department</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={slaBreaches}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 18% 90%)" />
              <XAxis dataKey="department" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="breaches" fill="hsl(0 65% 65%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
