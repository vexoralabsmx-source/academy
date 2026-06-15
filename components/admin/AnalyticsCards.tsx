import type { AnalyticsGroup } from "@/lib/admin/queries";
import { Card } from "@/components/ui";

export function AnalyticsCards({ groups }: { groups: AnalyticsGroup[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {groups.map((group) => (
        <Card key={group.title}>
          <h3 className="font-bold">{group.title}</h3>
          <div className="mt-5 space-y-3">
            {group.items.map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-xs text-slate-400"><span>{item.label}</span><span>{item.value}%</span></div>
                <div className="h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan" style={{ width: `${item.value}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
