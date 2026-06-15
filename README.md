# Vexora Academy

Vexora Academy es una plataforma web educativa premium para aprender tecnología real con rutas, cursos, lecciones, ejercicios, feedback inmediato, XP, niveles, rachas, dashboard, ranking, retos, labs y administración.

Tagline: **Aprende tecnología real. Practica. Recibe feedback. Sube de nivel.**

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, PostgreSQL, RLS y Storage-ready
- Vercel-ready
- Componentes reutilizables
- Seed data local y SQL para base real

## Instalación

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

Si `npm install` falla con `Invalid Version:` en `Node 24` + `npm 11`, usa una de estas opciones:

```bash
corepack pnpm install
npm run dev
```

o baja a `Node 20 LTS` con `npm 10`.

## Variables de entorno

Copia `.env.example` a `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

No uses `SUPABASE_SERVICE_ROLE_KEY` en componentes cliente.

## Configurar Supabase

1. Crea un proyecto en Supabase.
2. Ve a SQL Editor.
3. Ejecuta `supabase/schema.sql`.
4. Verifica que ya exista la tabla `public.profiles`.
5. Ejecuta `supabase/policies.sql`.
6. Ejecuta `supabase/seed.sql`.
6. Copia Project URL y anon key a `.env.local`.
7. Reinicia `npm run dev`.

## Crear el primer admin

1. Registra un usuario desde `/register`.
2. Busca el `id` del usuario en `auth.users`.
3. En Supabase SQL Editor ejecuta:

```sql
update public.profiles
set role = 'admin'
where id = 'UUID_DEL_USUARIO';
```

Si esa consulta falla con `relation "public.profiles" does not exist`, primero no se aplicó `supabase/schema.sql`.

Luego entra a `/admin`.

## Funcionalidad incluida

- Landing page premium con estética dark tech luxury.
- Catálogo en `/cursos`.
- Detalle de curso en `/cursos/[slug]`.
- Vista de aprendizaje en `/aprender/[courseSlug]/[lessonSlug]`.
- Rutas en `/rutas` y `/rutas/[slug]`.
- Dashboard en `/dashboard`.
- Perfil en `/perfil`.
- Ranking en `/ranking`.
- Retos en `/retos`.
- Labs: `/data-lab`, `/ai-lab`, `/code-lab`.
- Auth: `/login` y `/register`.
- Admin: `/admin`, `/admin/cursos`, `/admin/lecciones`, `/admin/ejercicios`, `/admin/usuarios`, `/admin/analytics`.
- Certificados visuales en `/certificados`.
- Blog en `/blog` y `/blog/[slug]`.

## Ejercicios y calificación

La carpeta `lib/grading` contiene:

- `gradeMultipleChoice`
- `gradeMultipleSelect`
- `gradeTextAnswer`
- `gradeCodeExact`
- `gradeFillBlank`
- `gradeOrdering`
- `gradeChecklist`
- `calculateXP`
- `calculateLevel`
- `normalizeAnswer`

Importante: para ejecución real de código se requiere sandbox seguro aislado. Esta versión usa validación simple y no ejecuta código arbitrario del usuario.

## Base de datos

Incluye SQL para:

- `profiles`
- `courses`
- `modules`
- `lessons`
- `exercises`
- `submissions`
- `progress`
- `course_enrollments`
- `learning_paths`
- `learning_path_courses`
- `achievements`
- `user_achievements`
- `certificates`
- `weekly_challenges`
- `challenge_submissions`
- `notes`

También incluye índices, RLS, trigger de creación de perfil, actualización de `updated_at` y trigger para sumar XP sin duplicar recompensas por ejercicio ya completado.

## Despliegue en Vercel

1. Sube el proyecto a GitHub.
2. Importa el repositorio en Vercel.
3. Configura las variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy.
5. En Supabase Auth, agrega la URL de producción en Redirect URLs.

## Verificación

Verificado localmente en este workspace:

- `tsc --noEmit`
- `next build`
- `next lint`

## Estructura

```txt
app/
components/
lib/
types/
supabase/
middleware.ts
```

La app usa datos demo en `lib/seed/data.ts` para que el producto se vea completo desde el primer arranque. Supabase queda preparado para reemplazar esa capa progresivamente por queries reales.

## Roadmap

### Fase 1

- MVP funcional
- Auth
- Cursos
- Lecciones
- Ejercicios
- XP
- Dashboard

### Fase 2

- Certificados visuales
- Retos semanales
- Ranking avanzado
- Notas por lección
- Favoritos
- Blog

### Fase 3

- Editor de código con sandbox seguro
- Tests automáticos reales
- IA tutor
- Recomendaciones personalizadas
- Pagos premium
- Comunidad
- Comentarios
- Panel analytics avanzado
# academy
