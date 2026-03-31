import React, { useEffect, useState } from "react";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Trash2, Search, Filter, Users } from "lucide-react";
import useAdmin from "../../../hooks/useAdmin";

export const AdminUsers: React.FC = () => {
  const { users, isLoading, deleteUser, refreshUsers } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  const filteredUsers = users?.filter(u => {
    const matchesSearch = (u.firstName + " " + u.lastName + " " + u.email).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  }) || [];

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1">
            Manage Users
          </h1>
          <p className="text-text-muted text-lg">
            View, search, and deactivate accounts across the platform.
          </p>
        </div>
      </header>

      <Card className="flex flex-col gap-0 p-0 overflow-hidden divide-y divide-border">
        <div className="p-6 bg-surface border-b border-border flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter size={18} className="text-text-muted" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-200 rounded-lg text-sm py-2 px-4 focus:outline-none focus:border-primary cursor-pointer bg-white"
            >
              <option value="ALL">All Roles</option>
              <option value="FARMER">Farmers</option>
              <option value="ADVISOR">Advisors</option>
              <option value="ADMIN">System Admins</option>
            </select>
          </div>
        </div>

        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 text-text-muted uppercase text-[10px] font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </div>
                      <span className="font-semibold text-text-main pr-10">
                        {user.firstName} {user.lastName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                         user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' :
                         user.role === 'ADVISOR' ? 'bg-blue-100 text-blue-700' :
                         'bg-green-100 text-green-700'
                       }`}>
                         {user.role}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-text-muted">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        disabled={isLoading || user.role === 'ADMIN'}
                        onClick={() => {
                          if (window.confirm('Are you sure you want to deactivate this user?')) {
                            deleteUser(user.id);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
              <Users size={32} />
            </div>
            <h3 className="text-lg font-bold text-text-main mb-1">No Users Found</h3>
            <p className="text-sm text-text-muted">No users match your current filters.</p>
          </div>
        )}
      </Card>
    </div>
  );
};
