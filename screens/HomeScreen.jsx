import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import React from "react";
import { SvgUri } from "react-native-svg";
import { MagnifyingGlassIcon } from "react-native-heroicons/solid";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchBarModal from "./SearchBarModal";
import HostelCard from "../components/HostelCard";
import { Navbar } from "../components";

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <SafeAreaView
        className="bg-slate-100 h-full"
        style={styles.droidSafeArea}
      >
        <View className="flex justify-between sticky top-0 bg-slate-100 flex-row items-center shadow-black shadow-md py-5 px-5">
          <View className="flex flex-row items-center gap-2">
            <View className="w-10 h-10 rounded-full flex justify-center items-center border border-gray-200 pl-1 bg-gray-300">
              <SvgUri
                width="80%"
                height="80%"
                uri="https://api.dicebear.com/8.x/miniavs/svg"
              />
            </View>

            <Text className="text-base font-medium">Bamfo Eli</Text>
          </View>
          <TouchableOpacity
            className="border flex items-center justify-center rounded-full text-green-600 w-10 h-10"
            onPress={() => navigation.navigate("Homsde")}
          >
            <MagnifyingGlassIcon color="green" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View className="">
            <Text className="text-2xl px-6 py-5 font-semibold">
              Featured Hostels
            </Text>
            <ScrollView
              horizontal
              className=" w-full"
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <HostelCard />
              <HostelCard />
              <HostelCard />
              <HostelCard />
            </ScrollView>
          </View>
          <View className="pt-20 px-6">
            <View className="w-full flex flex-row justify-between items-center">
              <Text className="text-2xl  py-5 font-semibold">
                Close To Campus
              </Text>
              <TouchableOpacity className=" shadow-sm flex items-center justify-center rounded-full bg-white text-gray-200 w-10 h-10">
                <MagnifyingGlassIcon color="gray" />
              </TouchableOpacity>
            </View>
            <ScrollView
              className=" w-full"
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <HostelCard one={1} />
              <HostelCard one={1} />
              <HostelCard one={1} />
              <HostelCard one={1} />
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Navbar />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,

    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
