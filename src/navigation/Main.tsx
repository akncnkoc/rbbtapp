import Introduction from "@/screens/introduction";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigation from "./Auth";

import { FC } from "react";
import ClientAppWrapper from "./ClientApp";
export type MainStackList = {
  Introduction: undefined;
  Auth: undefined;
  ClientApp: undefined;
};

const MainNavigator = createNativeStackNavigator<MainStackList>();
const MainNavigation: FC = () => {
  return (
    <MainNavigator.Navigator
      initialRouteName="Introduction"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <MainNavigator.Screen
        options={{ headerShown: false }}
        name="Introduction"
        component={Introduction}
      />
      <MainNavigator.Screen
        name="Auth"
        component={AuthNavigation}
      />
      <MainNavigator.Screen
        name="ClientApp"
        component={ClientAppWrapper}
      />
    </MainNavigator.Navigator>
  );
};

export default MainNavigation;
