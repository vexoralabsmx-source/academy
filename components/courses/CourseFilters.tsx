import { Input, Select } from "@/components/ui";

export function CourseFilters() {
  return (
    <div className="grid gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-4">
      <Input placeholder="Buscar cursos..." />
      <Select defaultValue="">
        <option value="">Todas las categorías</option>
        <option>Frontend</option>
        <option>Backend</option>
        <option>Data Analysis</option>
        <option>Artificial Intelligence</option>
      </Select>
      <Select defaultValue="">
        <option value="">Todas las dificultades</option>
        <option>Principiante</option>
        <option>Intermedio</option>
        <option>Avanzado</option>
      </Select>
      <Select defaultValue="popularidad">
        <option value="popularidad">Ordenar por popularidad</option>
        <option value="reciente">Reciente</option>
        <option value="dificultad">Dificultad</option>
      </Select>
    </div>
  );
}
