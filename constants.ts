
/**
 * SYCAD UI CONFIGURATION CONSTANTS
 * Use this file to change the visual identity of the application.
 */

export const THEME = {
  colors: {
    // Main Brand Colors
    primary: "#064e3b",      // Deep Emerald (Sidebar, Main Headers)
    primaryHover: "#065f46", 
    secondary: "#10b981",    // Emerald 500 (Accents)
    accent: "#34d399",       // Emerald 400 (Badges)
    
    // Feedback Colors
    success: "#059669",
    danger: "#f43f5e",       // Rose 500
    warning: "#f59e0b",      // Amber 500
    info: "#3b82f6",         // Blue 500
    
    // Backgrounds & Surfaces
    bgMain: "#fcfdfe",       // Page Background
    surface: "#ffffff",      // Card Background
    border: "#f1f5f9",       // Standard Slate Border
    muted: "#94a3b8"         // Slate 400 Text
  },
  
  borderRadius: {
    none: "0px",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2.5rem",
    full: "3rem"             // Main container rounding
  },
  
  spacing: {
    containerPadding: "p-6 md:p-10 lg:p-16",
    sectionGap: "space-y-10",
    headerMargin: "mb-12"
  },

  typography: {
    fontFamily: "'Outfit', sans-serif",
    h1: "text-4xl font-extrabold tracking-tight",
    h2: "text-xl font-bold",
    label: "text-[10px] font-black uppercase tracking-widest"
  }
};

export const APP_CONFIG = {
  processingDelay: "7 jours",
  systemReferenceFormat: "SR-JJ/MM/AAAA-N°",
  maxObservationLength: 500
};
