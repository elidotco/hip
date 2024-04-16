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
import client from "../sanity";
import { useState } from "react";
import { useEffect } from "react";

const HomeScreen = ({ navigation }) => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `
    *[_type=='hostels']{
      name,
      _id,
      cover_image,
      featured
    }`
      )
      .then((data) => {
        setDatas(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>; // Render loading indicator while data is being fetched
  }
  return (
    <>
      <SafeAreaView
        className="bg-slate-100 h-full"
        style={styles.droidSafeArea}
      >
        <View className="flex justify-between bg-slate-100 flex-row items-center  py-5 px-5">
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
              {datas.map((item) => {
                return item.featured === "yes" ? (
                  <HostelCard key={item._id} data={item} />
                ) : (
                  ""
                );
              })}
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
              {datas.map((item) => {
                return <HostelCard one={1} key={item._id} data={item} />;
              })}
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
