import { ThemeMode } from "@/lib/types/theme-mode";

const THEME_KEY = "theme";

export interface ThemePreferences {
    system: ThemeMode;
    local: ThemeMode | null;
}

export async function getCurrentTheme(): Promise<ThemePreferences> {
    const currentTheme = await window.themeMode.current();
    const localTheme = localStorage.getItem(THEME_KEY) as ThemeMode | null;

    return {
        system: currentTheme,
        local: localTheme,
    };
}


export async function toggleTheme() {
    const isDarkMode = await window.themeMode.toggle();
    const newTheme = isDarkMode ? "dark" : "light";

    localStorage.setItem(THEME_KEY, newTheme);
}