import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useAuth } from "../../auth/AuthProvider";

const SettinsScreen = ({ navigation }) => {
  const { logout } = useAuth();
  return (
    <View>
      <View className="w-full bg-blue-100 h-32 flex justify-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className=" z-40 p-3 w-12 flex items-center justify-center h-12 left-5 rounded-full bg-gray-100 shadow-md absolute"
        >
          <ArrowLeftIcon />
        </TouchableOpacity>
        {/* <Text className="text-center py-6 font-bold text-xl">
          My Favorite Hostels
        </Text> */}
      </View>
      <Text>SettinsScreen</Text>
      <TouchableOpacity
        onPress={() => {
          logout();
          navigation.navigate("Splash");
        }}
      >
        <Text>LOgout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettinsScreen;
