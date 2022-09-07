import { FC } from "react";
import Home from "@/screens/app/client/home";
import { moderateScale } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon, Text } from "native-base";

export type ClientAppStackParamList = {
  "/": NavigatorScreenParams<ClientAppBottomTabParams>;
  "/create-order": undefined;
  "/track-order": {
    orderId: number;
  };
  "/account-settings": undefined;
  "/payment-settings": undefined;
  "/add-invoice": undefined;
  "/add-corporate-invoice": undefined;
  "/add-personal-invoice": undefined;
  "/notification-settings": undefined;
  "/reviews": undefined;
  "/addresses": undefined;
  "/support": undefined;
  "/about-app": undefined;
};

export type ClientAppBottomTabParams = {
  Home: undefined;
  Orders: undefined;
  Notifications: undefined;
  Profile: undefined;
};

const ClientAppBottomTabIcons = {
  Home: ["ios-home", "ios-home-outline"],
  Orders: ["ios-archive", "ios-archive-outline"],
  Notifications: ["notifications-circle", "notifications-circle-outline"],
  Profile: ["person", "person-outline"],
};

const ClientAppBottomTab = createBottomTabNavigator<ClientAppBottomTabParams>();
const ClientAppStack = createStackNavigator<ClientAppStackParamList>();

const ClientAppWrapper: FC = () => {
  return (
    <ClientAppStack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        contentStyle: {
          backgroundColor: "#1C1C1C",
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
      initialRouteName="/"
    >
      <ClientAppStack.Screen
        name="/"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </ClientAppStack.Navigator>
  );
};

function BottomTabNavigator() {
  return (
    <ClientAppBottomTab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Icon
              as={Ionicons}
              name={ClientAppBottomTabIcons[route.name][focused ? 0 : 1]}
              size={"lg"}
              color={color}
              mt="4"
            />
          );
        },
        headerRight: () => {
          if (route.name !== "Home") {
            return (
              <Icon
                as={Ionicons}
                name="chatbubble"
                size={"lg"}
                color="#fff"
                style={{ marginRight: 16 }}
              />
            );
          }
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#000",
        headerStyle: {
          backgroundColor: "#000",
          borderBottomColor: "#000",
          shadowColor: "#000",
        },
        headerTitleStyle: {
          color: "#fff",
        },
      })}
    >
      <ClientAppBottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Rabbit",
          headerTitleStyle: {
            fontSize: moderateScale(26),
            color: "white"
          },
          tabBarLabel({ focused }) {
            return (
              <Text fontWeight={focused ? "semibold" : "normal"}>Anasayfa</Text>
            );
          },
        }}
      />
      <ClientAppBottomTab.Screen
        name="Orders"
        component={Home}
        options={{
          title: "Gönderiler",
          tabBarLabel({ focused }) {
            return (
              <Text fontWeight={focused ? "semibold" : "normal"}>
                Gönderiler
              </Text>
            );
          },
        }}
      />
      <ClientAppBottomTab.Screen
        name="Notifications"
        component={Home}
        options={{
          title: "Bildirimler",
          tabBarLabel({ focused }) {
            return (
              <Text fontWeight={focused ? "semibold" : "normal"}>
                Bildirimler
              </Text>
            );
          },
        }}
      />
      <ClientAppBottomTab.Screen
        name="Profile"
        component={Home}
        options={{
          title: "Profil",
          tabBarLabel({ focused }) {
            return (
              <Text fontWeight={focused ? "semibold" : "normal"}>Profil</Text>
            );
          },
        }}
      />
    </ClientAppBottomTab.Navigator>
  );
}

export default ClientAppWrapper;
