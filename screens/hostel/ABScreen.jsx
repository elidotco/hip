import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { ApproveCard } from "../../components";

const ABScreen = ({ navigation }) => {
  return (
    <View className="flex-1">
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
      <View className="justify-center flex-1 items-center">
        <Text className="text-[#5a189a]">No Bookings Available</Text>
        <ScrollView className="w-full px-5  border">
          <View className=" w-full flex gap-y-6">
            <ApproveCard />
            <ApproveCard />
            <ApproveCard />
            <ApproveCard />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ABScreen;
