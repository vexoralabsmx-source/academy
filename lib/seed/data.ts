import type { BlogPost, Challenge, Course, LabCard, LearningPath, UserProfile } from "@/types/course";
import type { Exercise, ExerciseType } from "@/types/exercise";

type CourseBlueprint = {
  title: string;
  slug: string;
  area: string;
  difficulty: Course["difficulty"];
  description: string;
  modules: { title: string; lessons: string[] }[];
};

const completeBlueprints: CourseBlueprint[] = [
  {
    title: "HTML desde cero",
    slug: "html-desde-cero",
    area: "Web Development",
    difficulty: "Principiante",
    description: "Aprende la estructura base de toda página web usando HTML semántico.",
    modules: [
      { title: "Fundamentos de HTML", lessons: ["Qué es HTML", "Etiquetas principales", "Estructura de una página", "Texto, enlaces e imágenes"] },
      { title: "Estructura semántica", lessons: ["Listas y tablas", "Formularios básicos", "HTML semántico", "Accesibilidad básica"] },
      { title: "Proyecto personal", lessons: ["Arquitectura de una página personal", "Contenido y navegación", "Buenas prácticas de marcado", "Mini proyecto: página personal"] }
    ]
  },
  {
    title: "CSS moderno",
    slug: "css-moderno",
    area: "Frontend",
    difficulty: "Principiante",
    description: "Aprende a diseñar interfaces modernas con CSS, Flexbox, Grid, responsive design y animaciones.",
    modules: [
      { title: "Fundamentos visuales", lessons: ["Selectores", "Colores y tipografía", "Box model", "Unidades modernas"] },
      { title: "Layout moderno", lessons: ["Flexbox", "Grid", "Responsive design", "Cards modernas"] },
      { title: "Responsive y efectos", lessons: ["Transiciones", "Estados hover", "Variables CSS", "Mini proyecto: landing page"] }
    ]
  },
  {
    title: "JavaScript práctico",
    slug: "javascript-practico",
    area: "Frontend",
    difficulty: "Principiante",
    description: "Aprende lógica, funciones, objetos, arrays, DOM y eventos con ejercicios prácticos.",
    modules: [
      { title: "Fundamentos", lessons: ["Variables", "Tipos de datos", "Condicionales", "Bucles"] },
      { title: "Estructuras y funciones", lessons: ["Funciones", "Arrays", "Objetos", "Métodos útiles"] },
      { title: "DOM y proyecto", lessons: ["DOM", "Eventos", "Estado de interfaz", "Mini proyecto: lista de tareas"] }
    ]
  },
  {
    title: "SQL desde cero",
    slug: "sql-desde-cero",
    area: "Databases",
    difficulty: "Principiante",
    description: "Consulta, filtra, agrupa y analiza datos con SQL.",
    modules: [
      { title: "Consultas base", lessons: ["Qué es SQL", "SELECT y FROM", "WHERE", "ORDER BY"] },
      { title: "Análisis", lessons: ["COUNT y SUM", "GROUP BY", "HAVING", "JOIN conceptual"] },
      { title: "Datos limpios", lessons: ["NULL y datos faltantes", "Modelado básico", "Índices simples", "Mini proyecto: reporte de ventas"] }
    ]
  },
  {
    title: "IA aplicada",
    slug: "ia-aplicada",
    area: "Artificial Intelligence",
    difficulty: "Principiante",
    description: "Aprende a usar IA para resolver problemas reales con prompts, flujos y criterio profesional.",
    modules: [
      { title: "Fundamentos de IA", lessons: ["Qué puede hacer la IA", "Limitaciones y riesgos", "Contexto e instrucciones", "Evaluación de respuestas"] },
      { title: "Prompts prácticos", lessons: ["Prompt engineering", "Roles y restricciones", "Formatos de salida", "Iteración de prompts"] },
      { title: "Productos con IA", lessons: ["Chatbots", "Automatizaciones inteligentes", "Casos de negocio", "Mini proyecto: asistente de soporte"] }
    ]
  }
];

const extraCourses: Omit<Course, "modules" | "lessonsCount" | "exercisesCount" | "xpTotal" | "isPublished">[] = [
  courseShell("TypeScript esencial", "typescript-esencial", "Frontend", "Intermedio", "Aprende a escribir JavaScript más seguro usando tipos, interfaces y buenas prácticas.", "TS"),
  courseShell("React para interfaces", "react-para-interfaces", "Frontend", "Intermedio", "Crea interfaces modernas con componentes, props, estado y hooks.", "RX"),
  courseShell("Next.js para apps reales", "nextjs-para-apps-reales", "Full Stack", "Intermedio", "Construye aplicaciones modernas con rutas, layouts, server components y deploy.", "NX"),
  courseShell("Backend con Node.js", "backend-con-nodejs", "Backend", "Intermedio", "Crea servidores, APIs y lógica backend con Node.js.", "ND"),
  courseShell("APIs REST", "apis-rest", "Backend", "Intermedio", "Aprende a diseñar, construir y consumir APIs profesionales.", "API"),
  courseShell("Python para datos", "python-para-datos", "Data Analysis", "Principiante", "Aprende Python aplicado a análisis de datos.", "PY"),
  courseShell("pandas práctico", "pandas-practico", "Data Analysis", "Intermedio", "Limpia, transforma y analiza datasets usando pandas.", "PD"),
  courseShell("Dashboards de datos", "dashboards-de-datos", "Data Analysis", "Intermedio", "Convierte datos en visualizaciones y reportes claros.", "DB"),
  courseShell("Prompt Engineering", "prompt-engineering", "Artificial Intelligence", "Principiante", "Aprende a escribir instrucciones efectivas para modelos de IA.", "AI"),
  courseShell("Automatización con APIs", "automatizacion-con-apis", "Automation", "Intermedio", "Automatiza tareas conectando servicios, formularios, webhooks y bases de datos.", "AU"),
  courseShell("UI/UX para productos digitales", "ui-ux-para-productos-digitales", "UI/UX Design", "Principiante", "Diseña interfaces claras, usables y atractivas.", "UX"),
  courseShell("Git y GitHub", "git-y-github", "Productivity", "Principiante", "Controla versiones, colabora y publica proyectos.", "GH"),
  courseShell("Seguridad web básica", "seguridad-web-basica", "Cybersecurity", "Principiante", "Aprende buenas prácticas para proteger cuentas, apps y datos.", "SEC")
];

function courseShell(
  title: string,
  slug: string,
  area: string,
  difficulty: Course["difficulty"],
  description: string,
  icon: string
) {
  return {
    id: slug,
    title,
    slug,
    description,
    longDescription: `${description} Incluye teoría directa, ejercicios cortos, prácticas guiadas y un proyecto final orientado a producto real.`,
    area,
    difficulty,
    estimatedHours: difficulty === "Principiante" ? 8 : 14,
    gradient: "from-cyan/20 via-electric/20 to-violet/20",
    icon,
    prerequisites: difficulty === "Principiante" ? ["No requiere experiencia previa"] : ["Fundamentos de programación", "Práctica con proyectos pequeños"],
    objectives: ["Entender conceptos clave", "Practicar con ejercicios", "Construir un entregable real"],
    finalProject: `Proyecto aplicado de ${title.toLowerCase()}`
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function makeExercise(courseSlug: string, lessonSlug: string, index: number, title: string, type: ExerciseType): Exercise {
  const base = `${courseSlug}-${lessonSlug}-${index}`;
  if (type === "multiple_choice") {
    return {
      id: `${base}-mc`,
      type,
      title: `Chequeo rápido: ${title}`,
      instructions: "Elige la respuesta más precisa.",
      question: `¿Cuál es una buena práctica al trabajar con ${title.toLowerCase()}?`,
      options: ["Memorizar sin practicar", "Probar con ejemplos pequeños", "Ignorar errores", "Copiar sin entender"],
      correctAnswer: "Probar con ejemplos pequeños",
      explanation: "Los ejemplos pequeños reducen fricción y convierten teoría en criterio práctico.",
      hint: "Piensa en la opción que te ayuda a validar comprensión.",
      xpReward: 10,
      difficulty: "Principiante"
    };
  }

  return {
    id: `${base}-text`,
    type: "text_answer",
    title: `Aplicación práctica: ${title}`,
    instructions: "Responde con una frase corta.",
    question: `Escribe una ventaja concreta de dominar ${title.toLowerCase()} en un proyecto real.`,
    expectedAnswer: ["mejora la calidad", "reduce errores", "crea mejores proyectos", "facilita el mantenimiento"],
    explanation: "La respuesta debe conectar el concepto con calidad, mantenimiento o valor real del proyecto.",
    hint: "Relaciona el concepto con claridad, errores, mantenimiento o velocidad.",
    xpReward: 10,
    difficulty: "Principiante"
  };
}

function lessonContent(title: string, area: string) {
  return `## Introducción
${title} es una pieza clave para construir productos digitales con criterio. El objetivo no es memorizar, sino entender cómo se usa en escenarios reales.

## Explicación
Trabaja el concepto en pasos pequeños: identifica el problema, escribe una solución mínima, revisa el resultado y mejora la estructura. En ${area}, esta práctica evita errores comunes y hace que tu trabajo sea más mantenible.

## Ejemplo
\`\`\`ts
const objetivo = "${title}";
const practica = ["entender", "probar", "mejorar"];
console.log(\`Estoy aprendiendo \${objetivo}\`);
\`\`\`

## Error común
Avanzar demasiado rápido sin validar lo aprendido. Si no puedes explicarlo con tus palabras, todavía necesitas practicar.

## Tip profesional
Guarda ejemplos pequeños reutilizables. Un buen builder crea una biblioteca personal de soluciones probadas.

## Mini resumen
- Entiende el concepto.
- Practica con un caso pequeño.
- Detecta errores.
- Conecta la lección con un proyecto real.`;
}

function buildCompleteCourse(blueprint: CourseBlueprint): Course {
  const modules = blueprint.modules.map((module, moduleIndex) => ({
    id: `${blueprint.slug}-mod-${moduleIndex + 1}`,
    title: module.title,
    description: `Bloque práctico para dominar ${module.title.toLowerCase()} con enfoque de producto.`,
    orderIndex: moduleIndex,
    lessons: module.lessons.map((lessonTitle, lessonIndex) => {
      const lessonSlug = slugify(lessonTitle);
      const exercises = [
        makeExercise(blueprint.slug, lessonSlug, 1, lessonTitle, "multiple_choice"),
        makeExercise(blueprint.slug, lessonSlug, 2, lessonTitle, "text_answer")
      ];
      return {
        id: `${blueprint.slug}-${lessonSlug}`,
        title: lessonTitle,
        slug: lessonSlug,
        description: `Aprende ${lessonTitle.toLowerCase()} con explicación clara, ejemplo y práctica inmediata.`,
        content: lessonContent(lessonTitle, blueprint.area),
        estimatedMinutes: 12,
        orderIndex: lessonIndex,
        isPreview: moduleIndex === 0 && lessonIndex === 0,
        exercises
      };
    })
  }));

  const lessonsCount = modules.reduce((total, module) => total + module.lessons.length, 0);
  const exercisesCount = modules.reduce((total, module) => total + module.lessons.reduce((sum, lesson) => sum + lesson.exercises.length, 0), 0);

  return {
    id: blueprint.slug,
    title: blueprint.title,
    slug: blueprint.slug,
    description: blueprint.description,
    longDescription: `${blueprint.description} Este curso incluye módulos guiados, ejercicios automáticos y un proyecto final para convertir conocimiento en entregables reales.`,
    area: blueprint.area,
    difficulty: blueprint.difficulty,
    estimatedHours: 10,
    gradient: "from-cyan/20 via-electric/20 to-violet/20",
    icon: blueprint.title.split(" ").map((word) => word[0]).join("").slice(0, 3).toUpperCase(),
    xpTotal: exercisesCount * 10,
    prerequisites: ["Ganas de practicar", "Computadora con navegador moderno"],
    objectives: ["Comprender fundamentos", "Resolver ejercicios", "Construir un mini proyecto", "Crear base para cursos avanzados"],
    finalProject: `Proyecto final aplicado de ${blueprint.title}`,
    modules,
    lessonsCount,
    exercisesCount,
    isPublished: true
  };
}

export const courses: Course[] = [
  ...completeBlueprints.map(buildCompleteCourse),
  ...extraCourses.map((course) => ({
    ...course,
    modules: [
      {
        id: `${course.slug}-intro`,
        title: "Inicio práctico",
        description: "Primer módulo demo listo para expandir.",
        orderIndex: 0,
        lessons: [
          {
            id: `${course.slug}-vision`,
            title: `Visión general de ${course.title}`,
            slug: "vision-general",
            description: "Mapa mental, conceptos y primer ejercicio.",
            content: lessonContent(`Visión general de ${course.title}`, course.area),
            estimatedMinutes: 10,
            orderIndex: 0,
            isPreview: true,
            exercises: [makeExercise(course.slug, "vision-general", 1, course.title, "multiple_choice")]
          }
        ]
      }
    ],
    lessonsCount: 7,
    exercisesCount: 14,
    xpTotal: 140,
    isPublished: true
  }))
];

export const learningPaths: LearningPath[] = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    slug: "frontend-developer",
    description: "Aprende HTML, CSS, JavaScript, TypeScript, React, Next.js y diseño de interfaces modernas.",
    difficulty: "Principiante",
    estimatedHours: 90,
    icon: "FE",
    gradient: "from-cyan/30 to-electric/25",
    courses: ["HTML desde cero", "CSS moderno", "JavaScript práctico", "TypeScript esencial", "React para interfaces", "Next.js para apps reales", "Deploy con Vercel"],
    exerciseCount: 68
  },
  {
    id: "backend-developer",
    title: "Backend Developer",
    slug: "backend-developer",
    description: "Aprende APIs, Node.js, autenticación, bases de datos, seguridad y arquitectura backend.",
    difficulty: "Intermedio",
    estimatedHours: 86,
    icon: "BE",
    gradient: "from-electric/30 to-violet/25",
    courses: ["Fundamentos de backend", "Node.js práctico", "APIs REST", "Auth y sesiones", "PostgreSQL", "Supabase", "Seguridad backend"],
    exerciseCount: 64
  },
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    slug: "full-stack-developer",
    description: "Construye aplicaciones completas con frontend, backend, auth, base de datos y deploy.",
    difficulty: "Intermedio",
    estimatedHours: 120,
    icon: "FS",
    gradient: "from-cyan/25 via-electric/20 to-violet/30",
    courses: ["Frontend moderno", "Backend práctico", "Bases de datos", "Auth", "SaaS apps", "Deploy", "Proyecto final full stack"],
    exerciseCount: 88
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    slug: "data-analyst",
    description: "Aprende análisis de datos con Excel, SQL, Python, pandas, limpieza de datos y dashboards.",
    difficulty: "Principiante",
    estimatedHours: 78,
    icon: "DA",
    gradient: "from-success/25 to-cyan/20",
    courses: ["Excel para análisis", "SQL desde cero", "Python para datos", "pandas práctico", "Visualización de datos", "Dashboards", "Proyecto de análisis real"],
    exerciseCount: 72
  },
  {
    id: "ai-builder",
    title: "AI Builder",
    slug: "ai-builder",
    description: "Aprende a crear productos con IA, prompts, automatizaciones, APIs de IA y flujos inteligentes.",
    difficulty: "Principiante",
    estimatedHours: 70,
    icon: "AI",
    gradient: "from-violet/35 to-cyan/20",
    courses: ["Fundamentos de IA", "Prompt engineering", "APIs de IA", "Chatbots", "Automatización con IA", "Agentes básicos", "Proyecto final con IA"],
    exerciseCount: 58
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    slug: "ui-ux-designer",
    description: "Aprende diseño de interfaces, wireframes, sistemas visuales, experiencia de usuario y prototipos.",
    difficulty: "Principiante",
    estimatedHours: 66,
    icon: "UX",
    gradient: "from-violet/30 to-electric/20",
    courses: ["Fundamentos UI/UX", "Diseño visual", "Wireframes", "Sistemas de diseño", "Landing pages", "Dashboards", "Portfolio UI/UX"],
    exerciseCount: 52
  },
  {
    id: "automation-specialist",
    title: "Automation Specialist",
    slug: "automation-specialist",
    description: "Crea flujos de automatización para negocios, productividad, atención al cliente y procesos digitales.",
    difficulty: "Intermedio",
    estimatedHours: 64,
    icon: "AU",
    gradient: "from-cyan/25 to-success/20",
    courses: ["Fundamentos de automatización", "Webhooks", "APIs", "Automatización de formularios", "Automatización con IA", "CRM básico", "Proyecto final"],
    exerciseCount: 48
  },
  {
    id: "cybersecurity-foundations",
    title: "Cybersecurity Foundations",
    slug: "cybersecurity-foundations",
    description: "Aprende seguridad digital básica, buenas prácticas, protección de cuentas, seguridad web y ética.",
    difficulty: "Principiante",
    estimatedHours: 44,
    icon: "CY",
    gradient: "from-danger/20 to-violet/20",
    courses: ["Seguridad digital", "Contraseñas y 2FA", "Seguridad web básica", "OWASP básico", "Protección de datos", "Buenas prácticas", "Laboratorio defensivo"],
    exerciseCount: 38
  },
  {
    id: "database-specialist",
    title: "Database Specialist",
    slug: "database-specialist",
    description: "Domina modelado, SQL, PostgreSQL, índices y diseño de datos para productos digitales.",
    difficulty: "Intermedio",
    estimatedHours: 58,
    icon: "DB",
    gradient: "from-electric/25 to-cyan/20",
    courses: ["SQL desde cero", "PostgreSQL", "Modelado", "Índices", "Datos limpios", "Reportes"],
    exerciseCount: 46
  },
  {
    id: "digital-product-builder",
    title: "Digital Product Builder",
    slug: "digital-product-builder",
    description: "Construye productos digitales completos con estrategia, interfaz, datos, automatización y deploy.",
    difficulty: "Intermedio",
    estimatedHours: 92,
    icon: "PB",
    gradient: "from-cyan/20 via-violet/25 to-electric/25",
    courses: ["Producto digital", "Landing pages", "SaaS básico", "Métricas", "IA aplicada", "Deploy", "Ventas tech"],
    exerciseCount: 63
  }
];

export const areas = [
  "Desarrollo Web",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Backend",
  "APIs",
  "Bases de datos",
  "SQL",
  "Python",
  "Análisis de datos",
  "Inteligencia artificial",
  "Automatización",
  "UI/UX",
  "Ciberseguridad básica",
  "Productividad digital",
  "Git y GitHub",
  "Deploy y hosting",
  "Freelancing tech",
  "Creación de productos digitales"
];

export const projects = [
  "Landing page profesional",
  "Dashboard SaaS",
  "API REST",
  "Bot de automatización",
  "Dashboard de datos",
  "Sistema de login",
  "App con base de datos",
  "Portfolio premium",
  "Tienda digital básica",
  "Herramienta con IA"
];

export const challenges: Challenge[] = [
  { title: "Crear una landing page", description: "Construye una primera sección clara, responsive y con CTA.", difficulty: "Principiante", xp: 60, type: "Frontend", status: "Activo" },
  { title: "Resolver quiz de JavaScript", description: "Practica variables, condicionales y funciones con feedback inmediato.", difficulty: "Principiante", xp: 40, type: "Quiz", status: "Activo" },
  { title: "Diseñar una card UI", description: "Crea una tarjeta premium con jerarquía, spacing y estados hover.", difficulty: "Principiante", xp: 45, type: "UI/UX", status: "Activo" },
  { title: "Escribir una query SQL", description: "Responde una pregunta de negocio con SELECT, WHERE y GROUP BY.", difficulty: "Intermedio", xp: 70, type: "Data", status: "Activo" },
  { title: "Analizar un dataset", description: "Detecta patrones, faltantes y una hipótesis accionable.", difficulty: "Intermedio", xp: 80, type: "Data Lab", status: "Nuevo" },
  { title: "Crear una API simple", description: "Diseña endpoints, payloads y errores esperados para un recurso.", difficulty: "Intermedio", xp: 90, type: "Backend", status: "Nuevo" },
  { title: "Automatizar una tarea", description: "Describe un flujo con trigger, acción, validación y resultado.", difficulty: "Intermedio", xp: 75, type: "Automation", status: "Activo" },
  { title: "Mejorar una interfaz", description: "Audita una pantalla y propone mejoras de usabilidad.", difficulty: "Principiante", xp: 50, type: "UI/UX", status: "Activo" },
  { title: "Crear un dashboard", description: "Define métricas, tarjetas, tabla y estado vacío de un panel SaaS.", difficulty: "Intermedio", xp: 95, type: "Full Stack", status: "Activo" }
];

export const dataLabCards: LabCard[] = [
  { title: "Calcula el ingreso total", description: "Suma ventas por producto y valida el resultado.", prompt: "ventas = precio * unidades", difficulty: "Principiante", xp: 30 },
  { title: "Encuentra el producto más vendido", description: "Compara unidades y detecta el líder.", prompt: "Ordena por unidades descendentes.", difficulty: "Principiante", xp: 35 },
  { title: "Identifica el mes con más ventas", description: "Agrupa ventas por mes y responde con evidencia.", prompt: "GROUP BY mes", difficulty: "Intermedio", xp: 50 },
  { title: "Detecta datos faltantes", description: "Revisa columnas incompletas y propone limpieza.", prompt: "Busca valores null o vacíos.", difficulty: "Principiante", xp: 35 },
  { title: "Interpreta una gráfica", description: "Explica tendencia, pico y posible causa.", prompt: "Describe insight y recomendación.", difficulty: "Intermedio", xp: 55 },
  { title: "Crea una hipótesis", description: "Convierte un patrón de datos en una hipótesis de negocio.", prompt: "Si X aumenta, entonces Y podría...", difficulty: "Intermedio", xp: 60 }
];

export const aiLabCards: LabCard[] = [
  { title: "Mejorar un prompt", description: "Agrega rol, contexto, formato y criterio de calidad.", prompt: "Convierte una instrucción vaga en una instrucción profesional.", difficulty: "Principiante", xp: 35 },
  { title: "Clasificar una respuesta", description: "Evalúa si una salida es precisa, útil y segura.", prompt: "Marca errores, omisiones y mejoras.", difficulty: "Principiante", xp: 35 },
  { title: "Diseñar un flujo de IA", description: "Define input, procesamiento, revisión humana y output.", prompt: "Crea un flujo para soporte al cliente.", difficulty: "Intermedio", xp: 65 },
  { title: "Crear instrucciones para un agente", description: "Especifica objetivo, límites, herramientas y formato.", prompt: "Instrucciones claras para un asistente operativo.", difficulty: "Intermedio", xp: 70 },
  { title: "Detectar errores en IA", description: "Encuentra alucinaciones, exceso de certeza y falta de fuentes.", prompt: "Evalúa una respuesta antes de usarla.", difficulty: "Intermedio", xp: 55 },
  { title: "Prompt para automatización", description: "Diseña una instrucción que transforme datos en acciones.", prompt: "De formulario a resumen accionable.", difficulty: "Intermedio", xp: 60 }
];

export const blogPosts: BlogPost[] = [
  "Cómo empezar en programación sin perderte",
  "Qué aprender primero: HTML, CSS o JavaScript",
  "Qué es una API y por qué importa",
  "Cómo usar IA para aprender mejor",
  "SQL explicado fácil",
  "Cómo crear tu primer portfolio",
  "Errores comunes al aprender programación",
  "Cómo practicar programación todos los días",
  "Qué es frontend y backend",
  "Cómo convertir habilidades tech en ingresos"
].map((title, index) => ({
  title,
  slug: slugify(title),
  excerpt: "Guía directa para avanzar con criterio, práctica y foco en proyectos reales.",
  content: `# ${title}

Aprender tecnología funciona mejor cuando conviertes cada concepto en una práctica concreta. Empieza con un objetivo pequeño, documenta lo que entiendes y construye un entregable que puedas enseñar.

## Idea clave
No solo veas teoría. Construye. Cada sesión debe terminar con una mejora visible: una pantalla, una query, un prompt, una función o una decisión de diseño.

## Acción recomendada
Elige un ejercicio, mide tu avance y repite. La consistencia gana cuando el sistema te muestra progreso real.`,
  category: index % 2 === 0 ? "Aprendizaje" : "Producto",
  readMinutes: 4 + (index % 4),
  date: `2026-0${(index % 6) + 1}-15`
}));

export const demoUser: UserProfile = {
  id: "demo",
  username: "builder_pro",
  fullName: "Vexora Builder",
  bio: "Aprendiendo desarrollo web, datos e IA aplicada con proyectos reales.",
  xp: 780,
  level: 8,
  streak: 14,
  role: "student"
};

export const leaderboard: UserProfile[] = [
  { ...demoUser, username: "builder_pro", fullName: "Vexora Builder", xp: 780, level: 8, streak: 14 },
  { ...demoUser, id: "2", username: "data_maker", fullName: "Data Maker", xp: 920, level: 10, streak: 21 },
  { ...demoUser, id: "3", username: "ui_runner", fullName: "UI Runner", xp: 860, level: 9, streak: 18 },
  { ...demoUser, id: "4", username: "api_crafter", fullName: "API Crafter", xp: 730, level: 8, streak: 9 },
  { ...demoUser, id: "5", username: "ai_builder", fullName: "AI Builder", xp: 690, level: 7, streak: 12 }
].sort((a, b) => b.xp - a.xp);

export function findCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export function findLesson(courseSlug: string, lessonSlug: string) {
  const course = findCourse(courseSlug);
  const lesson = course?.modules.flatMap((module) => module.lessons).find((item) => item.slug === lessonSlug);
  return { course, lesson };
}

export function findPath(slug: string) {
  return learningPaths.find((path) => path.slug === slug);
}

export function findPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
