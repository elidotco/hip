import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { getArrayData, storeArrayData } from "../storage";
import { useState } from "react";
import client from "../sanity";
import { useEffect } from "react";
import { HostelCard } from "../components";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../auth/AuthProvider";
import { db } from "../services/config";

const FavScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [none, setNone] = useState(false);

  const { users, logout } = useAuth();
  useEffect(() => {
    const dats = async () => {
      const docRef = query(
        collection(db, "bookings"),
        where("studentId", "==", users)
      );
      const docSnap = await getDocs(docRef);

      if (!docSnap.empty) {
        // Check if docSnap is not empty
        const bookingData = [];
        docSnap.forEach((doc) => {
          // Add data of each document to the array
          bookingData.push(doc.data());
        });

        // Set the state with the array of booking data
        setDatas(bookingData);
        setLoading(false); // Set loading state to false
      } else {
        setNone(true);
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    dats();
  }, []);
  console.log(datas);

  if (loading) {
    return (
      <View className="flex flex-1 justify-center items-center">
        <Text className="text-xl">Loading...</Text>
      </View>
    ); // Render loading indicator while data is being fetched
  }

  return (
    <View className="flex flex-1 pb-10">
      <View className="w-full bg-blue-100 h-32 flex justify-center">
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
      <ScrollView>
        <View className="pb-20 px-6">
          <ScrollView
            className="w-full"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {/* {data?.map((item, index) => (
              <HostelCard key={index} data={item} one={1} />
            ))} */}

            <View className="pt-20 ">
              <Text className="text-2xl font-bold pb-10">BOOKINGS</Text>

              {none ? (
                <Text className="text-center items-center">
                  You have not made any booking
                </Text>
              ) : (
                datas.map((item, index) => (
                  <View
                    className="w-full h-56 rounded-xl mb-10 flex bg-white shadow-md px-5 py-5"
                    key={index}
                  >
                    <View className=" flex flex-row justify-between">
                      <Text className="absolute top-10 text-2xl font-semibold">
                        {item.hostelName}
                      </Text>
                    </View>
                    <View className="mt-auto flex flex-row justify-between">
                      <Text>{`${item.roomType} in a room`}</Text>
                      <Text>{item.price}</Text>
                    </View>
                    <View className="flex flex-row justify-between items-center pt-7">
                      <Text>
                        {item.approved}
                        {item.approved === "Waiting"
                          ? " For Approval"
                          : item.approved === "Yes"
                          ? " your booking has been Approved"
                          : " your booking has been Denied"}
                      </Text>
                      <TouchableOpacity
                        className="py-3 px-4 bg-green-400 disabled:bg-gray-400 rounded-lg"
                        disabled={item.approved === "Waiting" ? true : false}
                      >
                        <Text>Pay</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default FavScreen;
