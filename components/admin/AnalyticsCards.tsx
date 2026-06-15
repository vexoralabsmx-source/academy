import { Card } from "@/components/ui";

export function AnalyticsCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {["Cursos más vistos", "Ejercicios más fallados", "Retención básica"].map((title) => (
        <Card key={title}>
          <h3 className="font-bold">{title}</h3>
          <div className="mt-5 space-y-3">
            {[74, 58, 42].map((value, index) => (
              <div key={index}>
                <div className="mb-1 flex justify-between text-xs text-slate-400"><span>Item {index + 1}</span><span>{value}%</span></div>
                <div className="h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan" style={{ width: `${value}%` }} /></div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
