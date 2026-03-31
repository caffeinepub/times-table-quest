import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["BricolageGrotesque", "system-ui", "sans-serif"],
        body: ["Figtree", "system-ui", "sans-serif"],
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        /* Game-specific palette */
        "game-blue":   "oklch(var(--game-blue))",
        "game-sky":    "oklch(var(--game-sky))",
        "game-orange": "oklch(var(--game-orange))",
        "game-yellow": "oklch(var(--game-yellow))",
        "game-green":  "oklch(var(--game-green))",
        "game-teal":   "oklch(var(--game-teal))",
        "game-pink":   "oklch(var(--game-pink))",
        "game-purple": "oklch(var(--game-purple))",
        "game-dark":   "oklch(var(--game-dark))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        xl: "calc(var(--radius) + 8px)",
        "2xl": "calc(var(--radius) + 16px)",
        "3xl": "calc(var(--radius) + 24px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        card: "0 4px 0 rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.12)",
        "card-hover": "0 6px 0 rgba(0,0,0,0.15), 0 12px 32px rgba(0,0,0,0.16)",
        button: "0 4px 0 rgba(0,0,0,0.25)",
        glow: "0 0 20px 4px rgba(255,122,47,0.4)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "15%":      { transform: "translateX(-10px)" },
          "30%":      { transform: "translateX(10px)" },
          "45%":      { transform: "translateX(-8px)" },
          "60%":      { transform: "translateX(8px)" },
          "75%":      { transform: "translateX(-5px)" },
          "90%":      { transform: "translateX(5px)" },
        },
        "pop-in": {
          "0%":   { transform: "scale(0.3) rotate(-10deg)", opacity: "0" },
          "60%":  { transform: "scale(1.15) rotate(3deg)" },
          "80%":  { transform: "scale(0.95) rotate(-1deg)" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(-2deg)" },
          "50%":      { transform: "translateY(-14px) rotate(2deg)" },
        },
        "timer-warn": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.4" },
        },
        "bounce-in": {
          "0%":   { transform: "scale(0.1)", opacity: "0" },
          "50%":  { transform: "scale(1.2)" },
          "70%":  { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "star-spin": {
          "from": { transform: "rotate(0deg) scale(1)" },
          "50%":  { transform: "rotate(180deg) scale(1.2)" },
          "to":   { transform: "rotate(360deg) scale(1)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.6" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shake: "shake 0.5s ease-in-out",
        "pop-in": "pop-in 0.5s cubic-bezier(0.68,-0.55,0.265,1.55)",
        float: "float 3s ease-in-out infinite",
        "timer-warn": "timer-warn 0.5s ease-in-out infinite",
        "bounce-in": "bounce-in 0.5s cubic-bezier(0.68,-0.55,0.265,1.55)",
        "star-spin": "star-spin 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
