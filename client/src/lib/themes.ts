export interface Theme {
  id: string;
  name: string;
  backgroundClass: string;
  gradientClass: string;
  backgroundColor: string;
  icon: string;
}

export const themes: Theme[] = [
  {
    id: "default",
    name: "Default",
    backgroundClass: "bg-pattern-default",
    gradientClass: "from-primary-500 to-secondary-500",
    backgroundColor: "bg-gradient-to-r from-primary-500 to-secondary-500",
    icon: "ri-palette-line"
  },
  {
    id: "purple",
    name: "Purple",
    backgroundClass: "bg-pattern-purple",
    gradientClass: "from-purple-500 to-pink-500",
    backgroundColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    icon: "ri-palette-line"
  },
  {
    id: "nature",
    name: "Nature",
    backgroundClass: "bg-pattern-nature",
    gradientClass: "from-green-500 to-teal-500",
    backgroundColor: "bg-gradient-to-r from-green-500 to-teal-500",
    icon: "ri-leaf-line"
  },
  {
    id: "sunset",
    name: "Sunset",
    backgroundClass: "bg-pattern-sunset",
    gradientClass: "from-amber-500 to-red-500",
    backgroundColor: "bg-gradient-to-r from-amber-500 to-red-500",
    icon: "ri-sun-line"
  },
  {
    id: "dark",
    name: "Dark",
    backgroundClass: "bg-pattern-dark",
    gradientClass: "from-gray-700 to-gray-900",
    backgroundColor: "bg-gradient-to-r from-gray-700 to-gray-900",
    icon: "ri-moon-line"
  }
];

export function getThemeById(id: string): Theme {
  return themes.find(theme => theme.id === id) || themes[0];
}
