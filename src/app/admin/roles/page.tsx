'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Check, Lock, Key, Layers, X, Sparkles, AlertCircle } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { API_ENDPOINTS } from '@/lib/constants/api-endpoints';

interface PermissionItem {
  id?: string;
  slug: string;
  name: string;
  group: string;
  description: string;
}

interface RoleItem {
  id: string;
  name: string;
  slug: string;
  isSystemRole: boolean;
  description: string;
  permissions: PermissionItem[];
}

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [permissionsList, setPermissionsList] = useState<PermissionItem[]>([]);
  const [selectedRole, setSelectedRole] = useState<RoleItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDesc, setNewRoleDesc] = useState('');
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const [fetchedRoles, fetchedPermissions] = await Promise.all([
        apiClient.get<RoleItem[]>(API_ENDPOINTS.ROLES.LIST).catch(() => []),
        apiClient.get<PermissionItem[]>(API_ENDPOINTS.ROLES.PERMISSIONS).catch(() => []),
      ]);

      if (fetchedRoles && fetchedRoles.length > 0) {
        setRoles(fetchedRoles);
        setSelectedRole(fetchedRoles[0]);
      }
      if (fetchedPermissions && fetchedPermissions.length > 0) {
        setPermissionsList(fetchedPermissions);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to load roles and permissions from server');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTogglePermission = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      setSelectedSlugs(selectedSlugs.filter((s) => s !== slug));
    } else {
      setSelectedSlugs([...selectedSlugs, slug]);
    }
  };

  const handleCreateCustomRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleName) return;

    setIsSubmitting(true);
    try {
      const slug = newRoleName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const createdRole = await apiClient.post<RoleItem>(API_ENDPOINTS.ROLES.CREATE, {
        name: newRoleName,
        slug,
        description: newRoleDesc || 'Custom role with assigned permissions.',
        permissionSlugs: selectedSlugs,
      });

      if (createdRole) {
        setRoles([...roles, createdRole]);
        setSelectedRole(createdRole);
      } else {
        await fetchData();
      }

      setIsModalOpen(false);
      setNewRoleName('');
      setNewRoleDesc('');
      setSelectedSlugs([]);
    } catch (err: any) {
      alert(err.message || 'Failed to create role');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Group available permissions by module
  const groupedPermissions = permissionsList.reduce((acc, perm) => {
    const groupName = perm.group || 'SYSTEM';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(perm);
    return acc;
  }, {} as Record<string, PermissionItem[]>);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border p-6 rounded-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-extrabold tracking-tight">Roles & Dynamic Permissions Control</h1>
          </div>
          <p className="text-xs text-muted-foreground">
            Configure dynamic database-driven RBAC access rules and assign modular permissions to custom roles in PostgreSQL.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          <span>Create Custom Role</span>
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{errorMsg}</span>
        </div>
      )}

      {isLoading ? (
        <div className="p-12 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Loading dynamic database roles and permissions...</span>
        </div>
      ) : (
        /* Main Grid: Roles List + Permissions Inspector */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Roles Cards */}
          <div className="space-y-3">
            <h2 className="text-xs uppercase font-extrabold text-muted-foreground tracking-wider px-1">System & Custom Roles</h2>
            {roles.map((role) => {
              const isSelected = selectedRole?.id === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRole(role)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-primary/10 border-primary shadow-md shadow-primary/10'
                      : 'bg-card border-border hover:border-muted-foreground/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Key className={`w-4 h-4 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                      <h3 className="font-extrabold text-sm text-foreground">{role.name}</h3>
                    </div>
                    {role.isSystemRole ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> System
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                        Custom
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{role.description}</p>
                  <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-muted-foreground">Permissions Granted:</span>
                    <span className="font-extrabold text-primary">
                      {role.permissions?.length || 0} / {permissionsList.length}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Permission Matrix Inspector for Selected Role */}
          {selectedRole && (
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-primary tracking-widest">Active Role Inspector</span>
                  <h2 className="text-lg font-extrabold text-foreground">{selectedRole.name}</h2>
                  <p className="text-xs text-muted-foreground">{selectedRole.description}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-primary/10 text-primary border border-primary/30 font-mono">
                  slug: {selectedRole.slug}
                </span>
              </div>

              {/* Grouped Permissions Matrix */}
              <div className="space-y-6">
                {Object.entries(groupedPermissions).map(([group, perms]) => (
                  <div key={group} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-primary" />
                      <h3 className="text-xs font-extrabold uppercase tracking-wider text-foreground">{group.replace('_', ' ')}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {perms.map((perm) => {
                        const isGranted = selectedRole.permissions?.some((p) => p.slug === perm.slug);
                        return (
                          <div
                            key={perm.slug}
                            className={`p-3 rounded-lg border flex items-start gap-3 transition-colors ${
                              isGranted
                                ? 'bg-primary/5 border-primary/30 text-foreground'
                                : 'bg-muted/20 border-border text-muted-foreground opacity-60'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                              isGranted ? 'bg-primary text-primary-foreground' : 'bg-muted border border-input'
                            }`}>
                              {isGranted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-xs">{perm.name}</span>
                              <span className="text-[10px] text-muted-foreground">{perm.description}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Create Custom Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-base font-extrabold">Create Custom Database Role</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomRole} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Role Title</label>
                  <input
                    type="text"
                    required
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="e.g. Regional Catalog Manager"
                    className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Role Description</label>
                  <input
                    type="text"
                    value={newRoleDesc}
                    onChange={(e) => setNewRoleDesc(e.target.value)}
                    placeholder="Brief scope of responsibilities..."
                    className="w-full bg-background border border-input rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Checkboxes selection */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-primary">Toggle Modular Permissions</h3>
                <div className="space-y-4">
                  {Object.entries(groupedPermissions).map(([group, perms]) => (
                    <div key={group} className="space-y-2">
                      <span className="text-[11px] font-bold text-muted-foreground uppercase">{group.replace('_', ' ')}</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {perms.map((perm) => {
                          const isChecked = selectedSlugs.includes(perm.slug);
                          return (
                            <label
                              key={perm.slug}
                              onClick={() => handleTogglePermission(perm.slug)}
                              className={`p-2.5 rounded-lg border cursor-pointer flex items-center justify-between text-xs transition-colors ${
                                isChecked ? 'bg-primary/10 border-primary/50 text-foreground font-bold' : 'bg-background border-border text-muted-foreground'
                              }`}
                            >
                              <span>{perm.name}</span>
                              <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                                isChecked ? 'bg-primary border-primary text-primary-foreground' : 'border-input'
                              }`}>
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md shadow-primary/20 disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving to Database...' : 'Save & Assign Permissions'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
