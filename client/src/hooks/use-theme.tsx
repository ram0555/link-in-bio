import { useState, useEffect } from "react";
import { themes, getThemeById } from "@/lib/themes";
import { useProfile } from "@/contexts/profile-context";

export function useTheme() {
  const { profile } = useProfile();
  const [currentTheme, setCurrentTheme] = useState(getThemeById(profile?.theme || "default"));

  useEffect(() => {
    if (profile?.theme) {
      setCurrentTheme(getThemeById(profile.theme));
    }
  }, [profile]);

  const setTheme = (themeId: string) => {
    const theme = getThemeById(themeId);
    setCurrentTheme(theme);
    
    // In a real application, this would update the user's theme preference in the database
    // For now, we just update the state
  };

  return {
    theme: currentTheme.id,
    themes,
    currentTheme,
    setTheme
  };
}
