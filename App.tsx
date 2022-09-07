import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Dosis_300Light,
  Dosis_400Regular,
  Dosis_500Medium,
  Dosis_600SemiBold,
  Dosis_700Bold,
} from "@expo-google-fonts/dosis";
import { NativeBaseProvider } from "native-base";
import { theme } from "@/theme";
import MainNavigation from "@/navigation/Main";
import { store } from "@/redux";
import { Provider } from "react-redux";
import FAB from "@/components/FAB";
export default function App() {
  const [fontsLoaded] = useFonts({
    Dosis_300Light,
    Dosis_400Regular,
    Dosis_500Medium,
    Dosis_600SemiBold,
    Dosis_700Bold,
  });
  if (!fontsLoaded) return <></>;
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <MainNavigation />
          {/* <FAB /> */}
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
