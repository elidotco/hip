import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeScreen,
  HostelScreen,
  SearchBarModal,
  FavScreen,
  SearchScreen,
  LoginScreen,
} from "./screens/index";
import SplashScreen from "./screens/SplashScreen";
import HostelHomeScreen from "./screens/HoScreen";
import DashScreen from "./screens/hostel/DashScreen";
import { ABScreen, SettinsScreen } from "./screens/hostel";
import BookingModal from "./screens/SearchBarModal";
import BookingScreen from "./screens/SearchBarModal";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          options={{ headerShown: false }}
          component={SplashScreen}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Ho"
          options={{ headerShown: false }}
          component={HostelHomeScreen}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Dash"
          options={{ headerShown: false }}
          component={DashScreen}
        />
        <Stack.Screen
          name="AB"
          options={{ headerShown: false }}
          component={ABScreen}
        />
        <Stack.Screen
          name="Settings"
          options={{ headerShown: false }}
          component={SettinsScreen}
        />

        <Stack.Screen
          name="HostelScreen"
          options={{ headerShown: false }}
          component={HostelScreen}
        />
        <Stack.Screen
          name="FavScreen"
          options={{ headerShown: false }}
          component={FavScreen}
        />
        <Stack.Screen
          name="SearchScreen"
          options={{ headerShown: false }}
          component={SearchScreen}
        />
        <Stack.Group
          screenOptions={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        >
          <Stack.Screen
            name="Homsde"
            options={{ headerShown: false, presentation: "modal" }}
            component={BookingScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
