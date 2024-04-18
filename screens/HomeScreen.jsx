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
import { getArrayData, getUserInfo, storeArrayData } from "../storage";

const HomeScreen = ({ navigation }) => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const checkUserInfo = async () => {
    const userInfo = await getUserInfo();
    // Assuming getUserInfo is an async function
    const fav = getArrayData((key = "Fav"));
    if (userInfo !== null) {
      setUser(userInfo);
      if (fav === null) {
        const emp = [];
        storeArrayData((key = "fav"), (value = emp));
      }

      // User is not logged in
      client
        .fetch(
          `
          *[_type=='hostels']{
            name,
            _id,
            cover_image,
            featured
          }
          `
        )
        .then((data) => {
          setDatas(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching hostel data:", error);
          setLoading(false);
        });
    } else {
      // User is logged in
      navigation.replace("Home"); // Navigate to the "Home" screen
    }
  };

  useEffect(() => {
    checkUserInfo(); // Call the function to check user information
  }, []);

  if (loading) {
    return (
      <View className="flex flex-1 justify-center items-center">
        <Text className="text-xl">Loading...</Text>
      </View>
    ); // Render loading indicator while data is being fetched
  }
  return (
    <>
      <SafeAreaView
        className="bg-slate-100 h-full"
        style={styles.droidSafeArea}
      >
        <View className="flex justify-between bg-slate-100 flex-row items-center  py-5 px-5">
          <View className="flex flex-row items-center gap-2">
            <View className="w-14 h-14 rounded-full flex justify-center items-center border border-gray-200 pl-1 bg-gray-300">
              <SvgUri
                width="80%"
                height="80%"
                uri={`https://api.dicebear.com/8.x/miniavs/svg?seed=${user}`}
              />
            </View>

            <Text className="text-base font-medium">{user}</Text>
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
