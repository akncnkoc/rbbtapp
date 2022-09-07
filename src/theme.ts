import { extendTheme } from "native-base";

export const theme = extendTheme({
  fontConfig: {
    Dosis: {
      300: {
        normal: "Dosis_300Light",
      },
      400: {
        normal: "Dosis_400Regular",
      },
      500: {
        normal: "Dosis_500Medium",
      },
      600: {
        normal: "Dosis_600SemiBold",
      },
      700: {
        normal: "Dosis_700Bold",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Dosis",
    body: "Dosis",
    mono: "Dosis",
  },
});