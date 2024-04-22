import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  HomeIcon,
  BookmarkIcon,
  BellIcon,
  Cog8ToothIcon,
} from "react-native-heroicons/outline";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

const Navbar = ({ one }) => {
  const navigation = useNavigation();
  if (one === 1) {
    return (
      <View className="absolute bottom-0 bg-white flex-row shadow-lg flex justify-between items-center w-full rounded-t-[30px] h-20 px-5 py-5">
        <TouchableOpacity className="  px-9 rounded-3xl py-3">
          <HomeIcon />
        </TouchableOpacity>
        <TouchableOpacity
          className=" px-9  rounded-3xl py-3"
          onPress={() => navigation.navigate("AB")}
        >
          <Text className="text-[#9DB2CE]">
            {" "}
            <BellIcon />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className=" px-9 rounded-3xl py-3"
          onPress={() => navigation.navigate("Settings")}
        >
          <Cog8ToothIcon />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View className="absolute bottom-0 bg-white flex-row shadow-lg flex justify-between items-center w-full rounded-t-[30px] h-20 px-5 py-5">
      <TouchableOpacity className="  px-9 rounded-3xl py-3">
        <HomeIcon />
      </TouchableOpacity>
      <TouchableOpacity
        className=" px-9  rounded-3xl py-3"
        onPress={() => navigation.navigate("SearchScreen")}
      >
        <Text className="text-[#9DB2CE]">
          {" "}
          <MagnifyingGlassIcon />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className=" px-9 rounded-3xl py-3"
        onPress={() => navigation.navigate("FavScreen")}
      >
        <BookmarkIcon />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
