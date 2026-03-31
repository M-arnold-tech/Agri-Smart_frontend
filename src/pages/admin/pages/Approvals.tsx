import React, { useEffect } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { CheckCircle, XCircle, ShieldCheck, Loader2 } from "lucide-react";
import useAdmin from "../../../hooks/useAdmin";

export const AdminApprovals: React.FC = () => {
  const { pendingAdvisors, isLoading, approveAdvisor, refreshPending } = useAdmin();

  useEffect(() => {
    refreshPending();
  }, []);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1">
            Verify Advisors
          </h1>
          <p className="text-text-muted text-lg">
            Review and approve new advisor registrations.
          </p>
        </div>
      </header>

      {isLoading && !pendingAdvisors ? (
        <div className="flex items-center justify-center p-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <Card className="flex flex-col gap-0 p-0 overflow-hidden divide-y divide-border">
          {pendingAdvisors && pendingAdvisors.length > 0 ? (
            pendingAdvisors.map((advisor) => (
              <div key={advisor.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-gray-50/50 transition-colors gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary-bg text-primary flex items-center justify-center font-bold text-xl uppercase shrink-0">
                    {advisor.firstName?.[0]}
                    {advisor.lastName?.[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-main text-lg">
                      {advisor.firstName} {advisor.lastName}
                    </h4>
                    <p className="text-sm text-text-muted mt-1">
                      District: <span className="font-medium text-text-main">{advisor.district || "Not specified"}</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button size="sm" variant="outline" disabled={isLoading} className="hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                    <XCircle size={18} className="mr-2" /> Reject
                  </Button>
                  <Button size="sm" onClick={() => approveAdvisor(advisor.id)} disabled={isLoading}>
                    <CheckCircle size={18} className="mr-2" /> Approve
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-lg font-bold text-text-main mb-1">No Pending Approvals</h3>
              <p className="text-sm text-text-muted">All advisor registrations have been reviewed.</p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
