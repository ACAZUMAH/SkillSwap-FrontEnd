import { Themes } from "src/interfaces";

export const themes: Themes = {
  light: {
    primaryColor: "brand",
    primaryShade: 6,
    colors: {
      brand: [
        "#e5edff", // 0 - lightest
        "#c1d3ff", // 1
        "#9ab8ff", // 2
        "#709eff", // 3
        "#4a85ff", // 4
        "#2b6ef7", // 5
        "#1f5de5", // 6 - primary
        "#1f54f2", // 7 
        "#1c47c2", // 8
        "#193ca1", // 9 - darkest
      ],
    },
  },
  dark: {
    primaryColor: "brand",
    primaryShade: 5,
    colors: {
      brand: [
        "#e5edff", // 0 - lightest
        "#c1d3ff", // 1
        "#9ab8ff", // 2
        "#709eff", // 3
        "#4a85ff", // 4
        "#2b6ef7", // 5
        "#1f5de5", // 6 - primary
        "#1f54f2", // 7 
        "#1c47c2", // 8
        "#193ca1", // 9 - darkest
      ],
    },
  }
};
