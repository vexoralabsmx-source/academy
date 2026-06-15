insert into public.learning_paths (title, slug, description, difficulty, estimated_hours, icon, gradient)
values
('Frontend Developer', 'frontend-developer', 'Aprende HTML, CSS, JavaScript, TypeScript, React, Next.js y diseño de interfaces modernas.', 'Principiante', 90, 'FE', 'from-cyan/30 to-electric/25'),
('Backend Developer', 'backend-developer', 'Aprende APIs, Node.js, autenticación, bases de datos, seguridad y arquitectura backend.', 'Intermedio', 86, 'BE', 'from-electric/30 to-violet/25'),
('Full Stack Developer', 'full-stack-developer', 'Construye aplicaciones completas con frontend, backend, auth, base de datos y deploy.', 'Intermedio', 120, 'FS', 'from-cyan/25 via-electric/20 to-violet/30'),
('Data Analyst', 'data-analyst', 'Aprende análisis de datos con Excel, SQL, Python, pandas, limpieza de datos y dashboards.', 'Principiante', 78, 'DA', 'from-success/25 to-cyan/20'),
('AI Builder', 'ai-builder', 'Aprende a crear productos con IA, prompts, automatizaciones, APIs de IA y flujos inteligentes.', 'Principiante', 70, 'AI', 'from-violet/35 to-cyan/20')
on conflict (slug) do nothing;

insert into public.courses (title, slug, description, long_description, area, difficulty, estimated_hours, gradient, icon, is_published, xp_total, prerequisites, objectives, final_project)
values
('HTML desde cero', 'html-desde-cero', 'Aprende la estructura base de toda página web usando HTML semántico.', 'Curso práctico con lecciones, ejercicios y mini proyecto personal.', 'Web Development', 'Principiante', 10, 'from-cyan/20 via-electric/20 to-violet/20', 'HTML', true, 240, array['Navegador moderno'], array['Entender HTML', 'Crear estructura semántica', 'Publicar una página personal'], 'Página personal semántica'),
('CSS moderno', 'css-moderno', 'Aprende a diseñar interfaces modernas con CSS, Flexbox, Grid, responsive design y animaciones.', 'Curso práctico para crear interfaces limpias y responsive.', 'Frontend', 'Principiante', 10, 'from-cyan/20 via-electric/20 to-violet/20', 'CSS', true, 240, array['HTML básico'], array['Dominar layout', 'Crear cards modernas', 'Diseñar responsive'], 'Landing page responsive'),
('JavaScript práctico', 'javascript-practico', 'Aprende lógica, funciones, objetos, arrays, DOM y eventos con ejercicios prácticos.', 'Curso práctico para agregar interacción real a interfaces.', 'Frontend', 'Principiante', 12, 'from-cyan/20 via-electric/20 to-violet/20', 'JS', true, 240, array['HTML y CSS básicos'], array['Entender lógica', 'Manipular DOM', 'Crear interfaces interactivas'], 'Lista de tareas interactiva'),
('SQL desde cero', 'sql-desde-cero', 'Consulta, filtra, agrupa y analiza datos con SQL.', 'Curso práctico para análisis y reportes con SQL conceptual.', 'Databases', 'Principiante', 10, 'from-cyan/20 via-electric/20 to-violet/20', 'SQL', true, 240, array['Ninguno'], array['Consultar datos', 'Agrupar métricas', 'Interpretar resultados'], 'Reporte de ventas'),
('IA aplicada', 'ia-aplicada', 'Aprende a usar IA para resolver problemas reales.', 'Curso práctico de prompts, evaluación y productos con IA.', 'Artificial Intelligence', 'Principiante', 10, 'from-violet/35 to-cyan/20', 'AI', true, 240, array['Criterio digital básico'], array['Crear prompts', 'Evaluar respuestas', 'Diseñar flujos con IA'], 'Asistente de soporte')
on conflict (slug) do nothing;

do $$
declare
  course_record record;
  module_titles text[] := array['Fundamentos', 'Práctica guiada', 'Proyecto real'];
  lesson_titles text[] := array['Concepto base', 'Ejemplo práctico', 'Errores comunes', 'Mini proyecto'];
  module_id uuid;
  lesson_id uuid;
  module_index integer;
  lesson_index integer;
begin
  for course_record in select id, title, slug from public.courses where slug in ('html-desde-cero', 'css-moderno', 'javascript-practico', 'sql-desde-cero', 'ia-aplicada') loop
    delete from public.exercises ex
    where ex.lesson_id in (
      select l.id from public.lessons l where l.course_id = course_record.id
    );

    delete from public.lessons where course_id = course_record.id;
    delete from public.modules where course_id = course_record.id;

    for module_index in 1..3 loop
      insert into public.modules (course_id, title, description, order_index)
      values (course_record.id, module_titles[module_index] || ' de ' || course_record.title, 'Bloque práctico con objetivos claros.', module_index)
      returning id into module_id;

      for lesson_index in 1..4 loop
        insert into public.lessons (module_id, course_id, title, slug, description, content, estimated_minutes, order_index, is_preview, is_published)
        values (
          module_id,
          course_record.id,
          lesson_titles[lesson_index] || ' - ' || course_record.title,
          course_record.slug || '-' || module_index || '-' || lesson_index,
          'Lección práctica con ejemplo, tip, resumen y ejercicio.',
          '## Introducción
Esta lección explica el concepto con enfoque práctico.

## Explicación
Aprende primero la idea, luego pruébala con un ejemplo pequeño y después llévala a un proyecto real.

## Ejemplo
Usa un caso mínimo y mejora desde ahí.

## Error común
Memorizar sin practicar.

## Tip profesional
Documenta tus decisiones.

## Mini resumen
- Entiende
- Practica
- Valida
- Construye',
          12,
          lesson_index,
          module_index = 1 and lesson_index = 1,
          true
        )
        returning id into lesson_id;

        insert into public.exercises (lesson_id, course_id, type, title, instructions, question, options, correct_answer, explanation, hint, xp_reward, order_index)
        values
        (lesson_id, course_record.id, 'multiple_choice', 'Chequeo rápido', 'Elige una respuesta.', '¿Cuál es la mejor forma de aprender este concepto?', '["Practicar con ejemplos", "Memorizar sin probar", "Ignorar errores", "Saltar al final"]'::jsonb, '"Practicar con ejemplos"'::jsonb, 'La práctica convierte teoría en criterio.', 'Busca la opción más práctica.', 10, 1),
        (lesson_id, course_record.id, 'text_answer', 'Respuesta corta', 'Responde con una frase.', 'Escribe una ventaja de practicar con proyectos reales.', null, null, 'La respuesta debe conectar práctica con valor real.', 'Piensa en claridad, portafolio o experiencia.', 10, 2);
      end loop;
    end loop;
  end loop;
end $$;

insert into public.achievements (title, description, icon, xp_reward, condition_key)
values
('Primera lección', 'Completa tu primera lección.', 'spark', 10, 'first_lesson'),
('Racha 7 días', 'Mantén una semana de práctica.', 'streak', 50, 'streak_7'),
('Primer proyecto', 'Entrega tu primer proyecto real.', 'project', 75, 'first_project'),
('Builder activo', 'Completa 25 ejercicios.', 'builder', 100, 'exercise_25')
on conflict do nothing;

insert into public.weekly_challenges (title, description, difficulty, xp_reward, type, starts_at, ends_at, is_active)
values
('Crear una landing page', 'Construye una primera sección clara, responsive y con CTA.', 'Principiante', 60, 'Frontend', now(), now() + interval '7 days', true),
('Escribir una query SQL', 'Responde una pregunta de negocio con SELECT, WHERE y GROUP BY.', 'Intermedio', 70, 'Data', now(), now() + interval '7 days', true),
('Mejorar una interfaz', 'Audita una pantalla y propone mejoras de usabilidad.', 'Principiante', 50, 'UI/UX', now(), now() + interval '7 days', true)
on conflict do nothing;
