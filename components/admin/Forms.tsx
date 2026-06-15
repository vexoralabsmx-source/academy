import { Button, Card, Input, Select, Textarea } from "@/components/ui";

export function CourseForm() {
  return <AdminForm title="Crear curso" fields={["Título", "Slug", "Área"]} />;
}

export function LessonForm() {
  return <AdminForm title="Crear lección" fields={["Título", "Slug", "Curso"]} textarea="Contenido markdown" />;
}

export function ExerciseForm() {
  return <AdminForm title="Crear ejercicio" fields={["Título", "Pregunta", "XP"]} textarea="Explicación y pista" />;
}

function AdminForm({ title, fields, textarea }: { title: string; fields: string[]; textarea?: string }) {
  return (
    <Card>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-5 grid gap-3">
        {fields.map((field) => <Input key={field} placeholder={field} />)}
        <Select><option>Principiante</option><option>Intermedio</option><option>Avanzado</option></Select>
        {textarea ? <Textarea placeholder={textarea} /> : null}
        <Button>Guardar borrador</Button>
      </div>
    </Card>
  );
}
