import { useTheme } from "@/hooks/use-theme";

export default function ThemeSelector() {
  const { themes, currentTheme, setTheme } = useTheme();
  
  return (
    <div className="mb-8 flex items-center justify-center space-x-2 animate-fade-in">
      <span className="text-sm font-medium text-gray-500">Theme:</span>
      <div className="flex space-x-2">
        {themes.map((theme) => (
          <button
            key={theme.id}
            className={`theme-option w-6 h-6 rounded-full ${theme.backgroundColor} border-2 ${
              currentTheme.id === theme.id ? "border-primary-500 scale-110" : "border-white"
            } shadow-sm`}
            onClick={() => setTheme(theme.id)}
            title={theme.name}
            aria-label={`Set theme to ${theme.name}`}
          />
        ))}
      </div>
    </div>
  );
}
