import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const HostelCard = ({ one }) => {
  return (
    <TouchableOpacity>
      <View
        className={`${
          one === 1 ? "w-full my-5" : "w-64 mx-5"
        }  h-64  rounded-lg relative`}
      >
        <View className="bg-green-500 w-full  bg-opacity-25 -z-10  h-full absolute top-0 rounded-lg">
          <Image
            source={{
              uri: "https://images.pexels.com/photos/17056814/pexels-photo-17056814/free-photo-of-silhouetted-trees-against-orange-red-sky-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            }}
            className="w-full h-full rounded-lg"
          />
        </View>
        <View className="px-5  h-full  py-6">
          <Text className="text-xl mt-auto text-gray-200 font-semibold">
            Hostel Card
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HostelCard;
