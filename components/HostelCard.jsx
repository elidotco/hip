import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { urlFor } from "../sanity";

const HostelCard = ({ one, data, user }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("HostelScreen", { id: data.id, user: user })
      }
    >
      <View
        className={`${
          one === 1 ? "w-full my-5" : "w-64 mx-5"
        }  h-64  rounded-lg relative`}
      >
        <View className="bg-green-500 w-full  bg-opacity-25 -z-10  h-full absolute top-0 rounded-lg">
          <Image
            source={{
              uri: data.coverImage,
            }}
            className="w-full h-full rounded-lg"
          />
        </View>
        <View className="px-5  h-full  py-6">
          <Text className="text-xl mt-auto text-gray-200 font-semibold">
            {data.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HostelCard;
