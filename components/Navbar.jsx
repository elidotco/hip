import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { HomeIcon, BookmarkIcon } from "react-native-heroicons/outline";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";

const Navbar = () => {
  return (
    <View className="absolute bottom-0 bg-white flex-row shadow-lg flex justify-between items-center w-full rounded-t-[30px] h-20 px-5 py-5">
      <TouchableOpacity className="border px-9 rounded-3xl py-3">
        <HomeIcon />
      </TouchableOpacity>
      <TouchableOpacity className="border px-9  rounded-3xl py-3">
        <Text className="text-[#9DB2CE]">
          {" "}
          <MagnifyingGlassIcon />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="border px-9 rounded-3xl py-3">
        <BookmarkIcon />
      </TouchableOpacity>
    </View>
  );
};

export default Navbar;
