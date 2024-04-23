import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ApproveCard = () => {
  return (
    <View className="flex relative w-full h-64 mb-6 px-5 py-5 bg-white shadow-md rounded-lg">
      <View className="flex ">
        <Text className="text-lg py-2  w-full ">Ebenzer Ametepeh</Text>
        <Text className="text-lg py-2 ">Four In a Room</Text>
        <Text className="text-lg py-2 ">Top Bunk</Text>
        <Text
          className="text-lg  absolute bottom-12 right-2
      "
        >
          Price
        </Text>
      </View>
      <View className="mt-auto flex flex-row ml-auto">
        <TouchableOpacity className="rounded-lg w-24 mr-5 p-5 bg-red-500">
          <Text className="text-white">Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity className="rounded-lg w-24  p-5 bg-green-500">
          <Text className="text-white">Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ApproveCard;
