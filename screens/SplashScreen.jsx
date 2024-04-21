import { View, Text } from "react-native";
import React from "react";
import { useEffect } from "react";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login"); // Replace 'ReplacementScreen' with the name of the screen you want to navigate to
    }, 4000); // 4000 milliseconds = 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex flex-1 bg-blue-300 items-center justify-center">
      <Text className="text-gray-200 font-bold text-4xl">HIP</Text>
    </View>
  );
};

export default SplashScreen;
