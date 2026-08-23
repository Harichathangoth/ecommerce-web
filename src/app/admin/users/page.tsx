'use client';

import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Shield,
  Store,
  Mail,
  Lock,
  UserCheck,
  CheckCircle,
  X,
  Trash2,
  Edit2,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';

interface UserRecord {
  id: string;
  fullName: string;
  email: string;
  role: 'SUPER_ADMIN' | 'BRANCH_ADMIN' | 'BRANCH_STAFF' | 'CUSTOMER';
  branchId?: string | null;
  branchName?: string;
  createdAt: string;
}

const mockInitialUsers: UserRecord[] = [
  {
    id: 'usr-1',
    fullName: 'Global Super Admin',
    email: 'admin@store.com',
    role: 'SUPER_ADMIN',
    branchId: null,
    branchName: 'All Branches (Global)',
    createdAt: '2026-01-15',
  },
  {
    id: 'usr-2',
    fullName: 'Sarah Connor',
    email: 'sarah.c@store.com',
    role: 'BRANCH_ADMIN',
    branchId: 'br-hq-01',
    branchName: 'Main Headquarters (HQ-01)',
    createdAt: '2026-02-01',
  },
  {
    id: 'usr-3',
    fullName: 'Marcus Wright',
    email: 'marcus.w@store.com',
    role: 'BRANCH_STAFF',
    branchId: 'br-est-02',
    branchName: 'East Coast Hub (EST-02)',
    createdAt: '2026-02-10',
  },
  {
    id: 'usr-4',
    fullName: 'David Miller',
    email: 'david.m@store.com',
    role: 'BRANCH_STAFF',
    branchId: 'br-wst-03',
    branchName: 'West Coast Hub (WST-03)',
    createdAt: '2026-03-05',
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>(mockInitialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'BRANCH_STAFF',
    branchId: 'br-hq-01',
  });
  const [isSaving, setIsSaving] = useState(false);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRoleFilter === 'ALL' || u.role === selectedRoleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // API call to server
      const created = await apiClient.post<UserRecord>('/users', formData);
      if (created) {
        setUsers([created, ...users]);
      }
    } catch {
      // Fallback local state insertion for demonstration
      const branchNames: Record<string, string> = {
        'br-hq-01': 'Main Headquarters (HQ-01)',
        'br-est-02': 'East Coast Hub (EST-02)',
        'br-wst-03': 'West Coast Hub (WST-03)',
      };
      const newUser: UserRecord = {
        id: `usr-${Date.now()}`,
        fullName: formData.fullName,
        email: formData.email,
        role: formData.role as any,
        branchId: formData.branchId,
        branchName: branchNames[formData.branchId] || 'Assigned Branch',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setUsers([newUser, ...users]);
    } finally {
      setIsSaving(false);
      setIsModalOpen(false);
      setFormData({
        fullName: '',
        email: '',
        password: '',
        role: 'BRANCH_STAFF',
        branchId: 'br-hq-01',
      });
    }
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to remove this staff member?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-purple-500/10 text-purple-400 border border-purple-500/30">SUPER ADMIN</span>;
      case 'BRANCH_ADMIN':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">BRANCH ADMIN</span>;
      case 'BRANCH_STAFF':
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">STAFF MEMBER</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-500/10 text-slate-400 border border-slate-500/30">CUSTOMER</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-500" />
            <h1 className="text-xl font-extrabold tracking-tight">Staff & Roles Management</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Manage administrative credentials, role-based access control (RBAC), and store branch assignments.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by staff name or email..."
            className="w-full bg-card border border-input rounded-lg pl-9 pr-4 py-2 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Role Filter */}
        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <Shield className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground font-semibold">Role:</span>
          <select
            value={selectedRoleFilter}
            onChange={(e) => setSelectedRoleFilter(e.target.value)}
            className="bg-card border border-input rounded-lg px-3 py-2 text-xs font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="ALL">All Roles</option>
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="BRANCH_ADMIN">Branch Admin</option>
            <option value="BRANCH_STAFF">Branch Staff</option>
          </select>
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border uppercase font-bold text-muted-foreground">
              <tr>
                <th className="p-4">Staff User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Assigned Branch</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground font-medium">
                    No staff records found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-cyan-500/10 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/20">
                          {user.fullName.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground">{user.fullName}</span>
                          <span className="text-[11px] text-muted-foreground">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{getRoleBadge(user.role)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 font-semibold text-foreground">
                        <Store className="w-3.5 h-3.5 text-cyan-500" />
                        <span>{user.branchName || 'Global Access'}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground font-medium">{user.createdAt}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 rounded-md hover:bg-rose-500/10 text-rose-500 transition-colors"
                          title="Remove user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-cyan-500" />
                <h2 className="text-base font-extrabold">Add New Staff Member</h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex.m@store.com"
                  className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground">Initial Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Assigned Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-background border border-input rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="BRANCH_STAFF">Branch Staff</option>
                    <option value="BRANCH_ADMIN">Branch Admin</option>
                    <option value="SUPER_ADMIN">Super Admin</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Store Branch</label>
                  <select
                    value={formData.branchId}
                    onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                    className="w-full bg-background border border-input rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="br-hq-01">Main Headquarters</option>
                    <option value="br-est-02">East Coast Hub</option>
                    <option value="br-wst-03">West Coast Hub</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2"
                >
                  {isSaving ? 'Saving...' : 'Create Staff Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
