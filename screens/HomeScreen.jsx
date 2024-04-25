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
import { useAuth } from "../auth/AuthProvider";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../services/config";

const HomeScreen = ({ navigation }) => {
  const { users } = useAuth();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [dats, setDats] = useState();

  useEffect(() => {
    if (users == null) {
      navigation.navigate("Login");
      return;
    }
    const checkUserInfo = async () => {
      const docRef = doc(db, "users", users);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        if (docSnap.data().role !== "student") {
          navigation.replace("Dash");
        }

        setDats(docSnap.data());
        setLoading(false);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      const arr = [];
      const q = query(collection(db, "hostels"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        arr.push(doc.data());
      });
      setDatas(arr);

      const fav = getArrayData((key = "Fav"));

      if (fav === null) {
        const emp = [];
        storeArrayData((key = "fav"), (value = emp));
        storeArrayData((key = "booking"), (value = emp));
      }
      // Assuming getUserInfo is an async function
    };
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
            <View className="w-14 h-14 rounded-full flex justify-center items-center  bg-white shadow-sm shadow-black  pl-1 ">
              <SvgUri
                width="80%"
                height="80%"
                uri={`https://api.dicebear.com/8.x/miniavs/svg?seed=${dats.firstName}`}
              />
            </View>

            <Text className="text-base font-medium">{dats.firstName}</Text>
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
                return item.featured ? (
                  <HostelCard key={item.id} data={item} user={dats} />
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
                return (
                  <HostelCard one={1} key={item.id} data={item} user={dats} />
                );
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
