# 🧠 Trivia Quiz — UPN

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel&logoColor=white)](https://quiz-app-wine-beta.vercel.app/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)

Aplicación web de preguntas y respuestas de opción múltiple, orientada a reforzar conceptos de **Programación Orientada a Objetos (POO)** y fundamentos de programación para estudiantes de la **Universidad Privada del Norte (UPN)**.

## 🌐 Demo en vivo

👉 **[https://quiz-app-wine-beta.vercel.app/](https://quiz-app-wine-beta.vercel.app/)**

## ✨ Características

- 🎲 **Preguntas aleatorias** — selecciona hasta 20 preguntas al azar de un banco de preguntas JSON.
- ✅ **Retroalimentación inmediata** — muestra si la respuesta fue correcta o incorrecta al instante, junto con la opción correcta.
- 📊 **Barra de progreso** — indicador visual del avance en el quiz.
- 🏆 **Pantalla de resultados** — muestra puntaje final con porcentaje y medalla según el desempeño.
- 🔄 **Reinicio rápido** — permite repetir el quiz con nuevas preguntas aleatorias sin recargar la página.
- 💅 **Soporte HTML en preguntas** — las preguntas pueden contener fragmentos de código con `<pre>`, `<code>` y texto enriquecido.

## 🛠️ Stack tecnológico

| Tecnología       | Versión  | Rol                              |
|-----------------|----------|----------------------------------|
| React           | ^19.x    | Framework UI                     |
| TypeScript      | ~5.9.x   | Tipado estático                  |
| Vite            | ^8.x     | Bundler y dev server             |
| pnpm            | —        | Gestor de paquetes               |

## 📁 Estructura del proyecto

```
random-questions/
├── public/
│   └── semana01/
│       ├── preguntas.json        # Banco de preguntas general
│       ├── preguntas_1.json      # Banco principal (50 preguntas de POO/programación)
│       └── preguntas_poo.json    # Banco de preguntas específico de POO
├── src/
│   ├── hooks/
│   │   └── useQuiz.ts            # Lógica del quiz (estado, navegación, puntuación)
│   ├── types/
│   │   └── quiz.ts               # Tipos TypeScript (Pregunta, QuizStatus)
│   ├── utils/
│   │   └── quizUtils.ts          # Utilidades (mezcla / selección aleatoria)
│   ├── App.tsx                   # Componente raíz con toda la UI del quiz
│   ├── App.css                   # Estilos del quiz
│   └── main.tsx                  # Punto de entrada
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🚀 Instalación y uso

### Prerrequisitos

- [Node.js](https://nodejs.org/) ≥ 18
- [pnpm](https://pnpm.io/) instalado globalmente

```bash
npm install -g pnpm
```

### Pasos

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd random-questions

# 2. Instalar dependencias
pnpm install

# 3. Iniciar el servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Otros comandos

```bash
pnpm build      # Genera el build de producción en /dist
pnpm preview    # Previsualiza el build de producción
pnpm lint       # Ejecuta ESLint sobre el código fuente
```

## 📝 Formato del banco de preguntas

Los archivos JSON deben seguir esta estructura:

```json
{
  "trivia": [
    {
      "id": 1,
      "pregunta": "Texto de la pregunta (admite HTML como <code> y <pre>)",
      "alternativas": [
        { "opcion": "1", "value": "Primera alternativa" },
        { "opcion": "2", "value": "Segunda alternativa" },
        { "opcion": "3", "value": "Tercera alternativa" },
        { "opcion": "4", "value": "Cuarta alternativa" }
      ],
      "respuesta_correcta": "2"
    }
  ]
}
```

> El campo `respuesta_correcta` debe coincidir con el valor del campo `opcion` de la alternativa correcta.

## 🎮 Flujo de la aplicación

```
[Pantalla de inicio] → [Clic en "Iniciar"] → [Pregunta 1..N]
       ↑                                            ↓
       └──────────── [Volver a jugar] ←── [Pantalla de resultados]
```

### Estados del quiz (`QuizStatus`)

| Estado       | Descripción                                      |
|-------------|--------------------------------------------------|
| `idle`      | Pantalla de bienvenida, antes de comenzar        |
| `playing`   | Pregunta activa, esperando respuesta del usuario |
| `answer`    | Muestra retroalimentación de la respuesta dada   |
| `finished`  | Muestra el puntaje y resultado final             |

## 🏅 Sistema de medallas

| Porcentaje de aciertos | Medalla |
|------------------------|---------|
| ≥ 90%                  | 🏆 Trofeo |
| ≥ 70%                  | 🥇 Oro   |
| ≥ 50%                  | 🥈 Plata |
| < 50%                  | 🥉 Bronce|

## 🪝 Hook `useQuiz`

El hook `useQuiz` centraliza toda la lógica del quiz:

- **`start()`** — mezcla las preguntas y comienza el juego.
- **`answer(opcion)`** — registra la respuesta del usuario y actualiza el puntaje.
- **`next()`** — avanza a la siguiente pregunta o finaliza el quiz.
- **`restart()`** — vuelve al estado `idle` para iniciar una nueva partida.

## 📚 Temática de las preguntas

Las preguntas del banco principal (`preguntas_1.json`) cubren conceptos como:

- Clases, objetos e instanciación
- Atributos y métodos
- Herencia y `@override`
- Tipos de datos (`int`, `String`, `double`, `bool`)
- Null Safety
- Listas y colecciones
- Operadores (`==`, `!`, `?`, `$`)
- Funciones, parámetros y `return`
- Navegación en aplicaciones móviles (Flutter)
- Buenas prácticas con IA generativa

---

> Proyecto académico desarrollado para la asignatura de **Programación** — UPN.
