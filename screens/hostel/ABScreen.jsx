import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { ApproveCard } from "../../components";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/config";
import { useAuth } from "../../auth/AuthProvider";

const ABScreen = ({ navigation, route }) => {
  const id = route.params.id;
  const [datas, setDatas] = useState([]);
  const [dats, setDats] = useState([]);
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [none, setNone] = useState(true);
  const [ids, setids] = useState([]);

  const { users, logout } = useAuth();

  useEffect(() => {
    const dats = async () => {
      const docRef = query(
        collection(db, "hostels"),
        where("managerId", "==", users)
      );
      const docSnap = await getDocs(docRef);

      if (!docSnap.empty) {
        // Check if docSnap is not empty
        const bookingData = [];
        docSnap.forEach((doc) => {
          // Add data of each document to the array
          bookingData.push(doc.data());
          setDatas(doc.data());
        });

        // Set the state with the array of booking data

        // Set loading state to false
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    dats();
  }, []);
  useEffect(() => {
    const dats = async () => {
      const docRef = query(
        collection(db, "bookings"),
        where("hosteId", "==", id),
        where("approved", "==", "Waiting")
      );
      const docSnap = await getDocs(docRef);

      if (!docSnap.empty) {
        // Check if docSnap is not empty
        const bookingData = [];
        const idss = [];
        docSnap.forEach((doc) => {
          console.log(doc.id);
          idss.push(doc.id);

          // Add data of each document to the array
          bookingData.push(doc.data());
        });

        // Set the state with the array of booking data
        setids(idss);
        setDats(bookingData);
        setLoading(false); // Set loading state to false
        setNone(false);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        setNone(true);
        setLoading(false);
      }
    };
    dats();
  }, []);
  console.log(dats);
  if (loading) {
    return (
      <View className="flex flex-1 justify-center items-center">
        <Text className="text-xl">Loading...</Text>
      </View>
    ); // Render loading indicator while data is being fetched
  }
  return (
    <View className="flex-1 justify-center items-center">
      <View className="w-full bg-blue-100 h-32 z-50 absolute top-0 flex justify-center  items-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className=" z-40 p-3 w-12 flex items-center justify-center h-12 left-5 rounded-full bg-gray-100 shadow-md absolute"
        >
          <ArrowLeftIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logout();
            navigation.replace("Splash");
          }}
          className="ml-auto absolute top-16 right-5 "
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>

      {none ? (
        <Text className="text-center py-6 font-bold ">
          No Bookings Avialable
        </Text>
      ) : (
        <View className="justify-center flex-1 w-full pt-20 items-center">
          <ScrollView className="w-full px-5 py-20">
            <View className=" w-full flex gap-y-6">
              {dats?.map((item, index) => (
                <ApproveCard key={index} id={ids[0]} data={item} />
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ABScreen;
