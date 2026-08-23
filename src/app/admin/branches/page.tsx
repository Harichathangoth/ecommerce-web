'use client';

import React, { useState } from 'react';
import { Store, Plus, MapPin, Phone, Users, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface BranchRecord {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  manager: string;
  staffCount: number;
  status: 'ACTIVE' | 'MAINTENANCE';
}

const initialBranches: BranchRecord[] = [
  {
    id: 'br-hq-01',
    name: 'Main Headquarters (HQ-01)',
    code: 'HQ-01',
    address: '100 Enterprise Way, Suite 500, New York, NY 10001',
    phone: '+1 (212) 555-0199',
    manager: 'Sarah Connor',
    staffCount: 24,
    status: 'ACTIVE',
  },
  {
    id: 'br-est-02',
    name: 'East Coast Distribution Hub (EST-02)',
    code: 'EST-02',
    address: '450 Logistics Blvd, Boston, MA 02110',
    phone: '+1 (617) 555-0244',
    manager: 'Marcus Wright',
    staffCount: 16,
    status: 'ACTIVE',
  },
  {
    id: 'br-wst-03',
    name: 'West Coast Fulfillment Hub (WST-03)',
    code: 'WST-03',
    address: '880 Silicon Parkway, San Jose, CA 95110',
    phone: '+1 (408) 555-0811',
    manager: 'David Miller',
    staffCount: 19,
    status: 'ACTIVE',
  },
];

export default function AdminBranchesPage() {
  const [branches] = useState<BranchRecord[]>(initialBranches);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-cyan-500" />
            <h1 className="text-xl font-extrabold tracking-tight">Store Branches & Fulfillment Hubs</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Manage multi-branch enterprise store locations, staff assignments, and regional inventory routing.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md shadow-cyan-500/20">
          <Plus className="w-4 h-4" />
          <span>Add New Store Branch</span>
        </button>
      </div>

      {/* Branch Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div key={branch.id} className="bg-card border border-border rounded-xl p-5 space-y-4 shadow-sm hover:border-cyan-500/50 transition-all group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 font-extrabold flex items-center justify-center text-xs border border-cyan-500/20">
                  {branch.code}
                </div>
                <h3 className="font-extrabold text-sm text-foreground">{branch.name}</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{branch.status}</span>
              </span>
            </div>

            <div className="space-y-2 text-xs text-muted-foreground pt-2 border-t border-border">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                <span>{branch.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>{branch.phone}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border/50 font-semibold text-foreground">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Manager: {branch.manager}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <span>{branch.staffCount} Staff</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
