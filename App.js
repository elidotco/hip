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
} from "./screens/index";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
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
            component={SearchBarModal}
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
