import { View, Text } from "react-native";
import React from "react";

const RoomCard = ({ data }) => {
  return (
    <View className="w-56 h-56 mx-3 px-6 py-6 rounded-xl bg-gray-300 border">
      <Text className="text-2xl font-medium">{data.type}</Text>
      <Text className="mt-auto ml-auto font-medium text-xl">
        {data.price}/Sem
      </Text>
    </View>
  );
};

export default RoomCard;
