export function Toast({ message }: { message: string }) {
  return <div className="rounded-lg border border-cyan/25 bg-cyan/10 px-4 py-3 text-sm text-cyan shadow-glow">{message}</div>;
}
