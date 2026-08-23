import { useAppSelector } from '@/store/hooks';

export function usePermissions() {
  const { user } = useAppSelector((state) => state.auth);

  const permissions: string[] = Array.isArray(user?.role?.permissions)
    ? user.role.permissions.map((p: any) => p.slug || p)
    : [];

  const isSuperAdmin =
    user?.role?.slug === 'super_admin' ||
    user?.role === 'SUPER_ADMIN' ||
    user?.role?.name === 'Super Administrator';

  const hasPermission = (permissionSlug: string): boolean => {
    if (isSuperAdmin) return true;
    return permissions.includes(permissionSlug);
  };

  const hasAnyPermission = (permissionSlugs: string[]): boolean => {
    if (isSuperAdmin) return true;
    return permissionSlugs.some((slug) => permissions.includes(slug));
  };

  const hasAllPermissions = (permissionSlugs: string[]): boolean => {
    if (isSuperAdmin) return true;
    return permissionSlugs.every((slug) => permissions.includes(slug));
  };

  return {
    user,
    permissions,
    isSuperAdmin,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
}
