import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { SvgUri } from "react-native-svg";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View className="flex justify-between flex-row items-center py-10 px-5">
        <View className="flex flex-row items-center gap-2">
          <View className="w-16 h-16 rounded-full flex justify-center items-center border border-gray-200 pl-1 bg-gray-300">
            <SvgUri
              width="80%"
              height="80%"
              uri="https://api.dicebear.com/8.x/miniavs/svg"
            />
          </View>

          <Text className="text-xl">HomeScreen</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
