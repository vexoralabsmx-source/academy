export function DatasetPreview() {
  const rows = [
    ["Enero", "Landing Pro", "$1,200", "24"],
    ["Febrero", "Dashboard Kit", "$2,050", "31"],
    ["Marzo", "AI Toolkit", "$2,880", "42"]
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/[0.04] text-slate-400"><tr>{["Mes", "Producto", "Ingreso", "Unidades"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
        <tbody>{rows.map((row) => <tr key={row[0]} className="border-t border-white/10">{row.map((cell) => <td key={cell} className="px-4 py-3 text-slate-300">{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
