export default function AdminName({ role, name, className }) {
  if (role !== "admin") {
    return <span className={className}>{name}</span>;
  }

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`admin-glow ${className || ""}`}>{name}</span>
      <span className="px-1.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 text-[9px] font-extrabold uppercase tracking-wider shadow-[0_0_8px_rgba(244,63,94,0.6)]">
        Admin
      </span>
    </span>
  );
}
