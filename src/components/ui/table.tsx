import * as React from 'react';

export function TableContainer({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-border bg-card shadow-sm scrollbar-none ${className}`}>
      <table className="w-full text-left text-xs sm:text-sm text-foreground border-collapse">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <thead className={`bg-muted/50 border-b border-border text-[11px] uppercase tracking-wider font-extrabold text-muted-foreground ${className}`}>
      {children}
    </thead>
  );
}

export function TableBody({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <tbody className={`divide-y divide-border ${className}`}>{children}</tbody>;
}

export function TableRow({
  children,
  className = '',
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <tr
      onClick={onClick}
      className={`transition-colors hover:bg-muted/30 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </tr>
  );
}

export function TableHead({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <th className={`px-4 py-3.5 font-bold ${className}`}>{children}</th>;
}

export function TableCell({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3.5 text-xs text-foreground align-middle ${className}`}>{children}</td>;
}
