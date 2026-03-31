import React from "react";
import { Card } from "../../../components/ui/Card";
import { Activity, MessageSquare, CloudSun, UserCheck, AlertTriangle } from "lucide-react";

const MOCK_LOGS = [
  { id: 1, type: "sms", message: "Weather alert SMS blast sent to 1,245 farmers in Kayonza.", time: "10 mins ago", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-50" },
  { id: 2, type: "weather", message: "System synced with Meteo Rwanda API successfully.", time: "1 hour ago", icon: CloudSun, color: "text-amber-500", bg: "bg-amber-50" },
  { id: 3, type: "auth", message: "Advisor 'Emmanuel K.' profile approved by Admin.", time: "3 hours ago", icon: UserCheck, color: "text-primary", bg: "bg-primary-bg" },
  { id: 4, type: "system", message: "Database automated backup completed (Size: 4.2GB).", time: "5 hours ago", icon: Activity, color: "text-purple-500", bg: "bg-purple-50" },
  { id: 5, type: "alert", message: "Failed login attempt detected from IP 192.168.1.5", time: "Yesterday", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
];

export const AdminLogs: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1">
            System Health Logs
          </h1>
          <p className="text-text-muted text-lg">
            Monitor automated tasks, system events, and errors.
          </p>
        </div>
      </header>

      <Card className="flex flex-col gap-0 p-0 overflow-hidden divide-y divide-border">
        {MOCK_LOGS.map((log) => {
          const Icon = log.icon;
          return (
            <div key={log.id} className="flex items-start gap-4 p-6 hover:bg-gray-50/50 transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-1 ${log.bg} ${log.color}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-text-main text-[15px]">
                    {log.type.charAt(0).toUpperCase() + log.type.slice(1)} Event
                  </h4>
                  <span className="text-xs font-medium text-text-muted bg-gray-100 px-2 py-1 rounded-full">{log.time}</span>
                </div>
                <p className="text-sm text-text-muted">
                  {log.message}
                </p>
              </div>
            </div>
          );
        })}
      </Card>
      
      <div className="flex justify-center mt-2">
         <button className="text-sm font-bold text-primary hover:underline">Load More Logs...</button>
      </div>
    </div>
  );
};
