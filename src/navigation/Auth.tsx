import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import PhoneScreen from "@/screens/auth/PhoneScreen";
import { moderateScale } from "@/utils";
import CodeScreen from "@/screens/auth/CodeScreen";
import UserTypeSelectorScreen from "@/screens/auth/UserTypeSelectorScreen";
import ClientPersonalInformationScreen from "@/screens/auth/ClientPersonalInformationScreen";
import ClientRegisterSuccessScreen from "@/screens/auth/ClientRegisterSuccessScreen";

export type AuthStackParams = {
  Phone: undefined;
  Code: {
    phone: string;
  };
  UserTypeSelector: undefined;
  ClientPersonalInformation: undefined;
  CourierPersonalInformation: undefined;
  ClientRegisterSuccess: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthNavigation: FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        contentStyle: {
          backgroundColor: "white",
        },
        headerLeft: () =>
          (navigation.canGoBack() && (
            <Icon
              as={Ionicons}
              name="arrow-back-outline"
              color="#fff"
              size="22"
              onPress={() => navigation.goBack()}
            />
          )) || <></>,
        headerStyle: {
          backgroundColor: "#000",
          shadowOpacity: 10,
        },
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "Dosis_500Medium",
          fontWeight: "500",
          fontSize: moderateScale(20),
        },
      })}
      initialRouteName="Phone"
    >
      <AuthStack.Screen
        name="Phone"
        component={PhoneScreen}
        options={{ title: "Kayıt Ol & Giriş Yap" }}
      />
      <AuthStack.Screen
        name="Code"
        component={CodeScreen}
        options={{ title: "Kod Doğrulama" }}
      />
      <AuthStack.Screen
        name="UserTypeSelector"
        component={UserTypeSelectorScreen}
        options={{ title: "Kullanıcı Tipi Seçimi" }}
      />
      <AuthStack.Screen
        name="ClientPersonalInformation"
        component={ClientPersonalInformationScreen}
        options={{ title: "Kişisel Bilgiler" }}
      />
      <AuthStack.Screen
        name="ClientRegisterSuccess"
        component={ClientRegisterSuccessScreen}
        options={{ title: "Kayıt Başarılı" }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
