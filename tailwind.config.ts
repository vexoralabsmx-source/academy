import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070D",
        surface: "#080B14",
        cyan: "#00E5FF",
        electric: "#2563EB",
        violet: "#8B5CF6",
        success: "#22C55E",
        xp: "#FACC15",
        danger: "#EF4444"
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 229, 255, 0.18)",
        violet: "0 0 45px rgba(139, 92, 246, 0.2)"
      },
      backgroundImage: {
        "radial-cyan": "radial-gradient(circle at top left, rgba(0,229,255,.24), transparent 34%)",
        "radial-violet": "radial-gradient(circle at top right, rgba(139,92,246,.22), transparent 36%)",
        "grid-pattern": "linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
