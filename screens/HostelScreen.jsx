import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacityBase,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  StarIcon,
  BookmarkIcon,
} from "react-native-heroicons/solid";
import {
  BookmarkIcon as EmptyIcon,
  MapIcon,
} from "react-native-heroicons/outline";
import client, { urlFor } from "../sanity";
import RoomCard from "../components/RoomCard";
import { getArrayData, storeArrayData } from "../storage";
import AmenCard from "../components/AmenCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/config";
import openMap from "react-native-open-maps";

import { Linking, Platform } from "react-native";

const HostelScreen = ({ route, navigation }) => {
  const [fav, setFav] = useState(false);
  const [id] = useState(route.params.id);
  const [users] = useState(route.params.users);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clicked, setClicked] = useState(true);
  const [room, setRoom] = useState("");
  const [price, setPrice] = useState();
  const [message, setMessage] = useState(false);

  const openMap = async (
    latitude = datas.location.latitude,
    longitude = datas.location.latitude,
    label = datas.name
  ) => {
    const tag = `${Platform.OS === "ios" ? "maps" : "geo"}:0,0?q=`;
    const link = Platform.select({
      ios: `${scheme}${label}@${latitude},${longitude}`,
      android: `${scheme}${latitude},${longitude}(${label})`,
    });

    try {
      const supported = await Linking.canOpenURL(link);

      if (supported) Linking.openURL(link);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(room, clicked);

  const bookRoom = async () => {
    if (datas.length > 0 && room) {
      try {
        const bookingDetails = {
          hostelId: datas[0]._id,
          room: room,
          price: price,
        };

        // Get existing bookings from AsyncStorage
        const existingBookings = (await getArrayData("bookings")) || [];

        // Check if the selected room is already booked
        const isRoomAlreadyBooked = existingBookings.some(
          (booking) =>
            booking.hostelId === datas[0]._id && booking.room === room
        );

        if (isRoomAlreadyBooked) {
          console.log("This room has already been booked.");
          // Optionally, provide feedback to the user that the room is already booked
          return;
        }

        // If the room is not already booked, proceed with booking
        const updatedBookings = [...existingBookings, bookingDetails];
        await storeArrayData("bookings", updatedBookings);
      } catch (error) {
        console.error("Error booking room:", error);
        // Handle booking error
      }
    }
  };
  const app = () => {
    openMap({
      latitude: datas.location.latitude,
      longitude: datas.location.longitude,
    });
  };
  useEffect(() => {
    const dats = async () => {
      const docRef = doc(db, "hostels", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setDatas(docSnap.data());
        setLoading(false);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    dats();
  }, []);

  const checkfav = async () => {
    if (datas) {
      const favs = (await getArrayData((key = "fav"))) || []; // Get user's favorite hostels

      if (favs.includes(datas.id)) {
        // Use optional chaining to avoid errors
        setFav(true);
      }
    }
  };

  useEffect(() => {
    checkfav();
  }, [datas]);

  const toggleFavorite = async () => {
    if (datas) {
      setFav(!fav); // Toggle favorite state
      const favs = (await getArrayData((key = "fav"))) || []; // Get user's favorite hostels
      const hostelId = datas.id;
      if (fav) {
        // If hostel is already favorite, remove it
        const updatedFavs = favs.filter((id) => id !== hostelId);
        storeArrayData("fav", updatedFavs); // Update favorites in AsyncStorage
      } else {
        // If hostel is not favorite, add it
        const updatedFavs = [...favs, hostelId];
        storeArrayData("fav", updatedFavs); // Update favorites in AsyncStorage
      }
    } else {
      console.error("No hostel data available to toggle favorite.");
    }
  };
  console.log(datas);

  if (loading) {
    return <Text>Loading...</Text>; // Render loading indicator while data is being fetched
  }

  return (
    <SafeAreaView className="h-full">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute z-40 p-3 top-7 left-5 rounded-full bg-gray-100 shadow-md"
      >
        <ArrowLeftIcon />
      </TouchableOpacity>
      <View className="h-[50%] ">
        <Image
          source={{
            uri: datas.coverImage,
          }}
          className="w-full h-full"
        />
        <View className="mt-auto px-6 pb-9 flex flex-row justify-between items-center text-white">
          <Text className="text-white font-semibold text-2xl">
            {datas.name}
          </Text>
          <TouchableOpacity onPress={() => toggleFavorite()}>
            {fav ? <BookmarkIcon /> : <EmptyIcon />}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text className="px-6 ml-auto py-5 text-green-600 font-medium text-lg">
          Available
        </Text>

        {/* Distance to campus */}
        <View className="flex flex-row justify-between items-center px-7">
          <Text className="text-lg font-semibold">Distance to Campus</Text>
          <Text className="text-xl ">{datas.distance}km</Text>
        </View>

        <TouchableOpacity onPress={app}>
          <View className="flex flex-row px-6 py-5 items-center">
            <MapIcon size={30} />
            <Text className="text-lg">{datas.Address}</Text>
          </View>
        </TouchableOpacity>

        <View className="flex flex-row pb-6  items-center px-6 gap-1">
          <Text className="text-base font-medium">Phone Number :</Text>
          <Text>{datas.phoneNumber}</Text>
        </View>

        {/* Rooom Types  */}

        <View className="px-6 py-10">
          <TouchableOpacity
            className={
              "w-full h-[60px] flex justify-center items-center rounded-md  bg-[#007bff]"
            }
            onPress={() =>
              navigation.navigate("Homsde", {
                id: id,
                user: users,
                name: datas.name,
              })
            }
          >
            <Text className="text-white"> Book An Room</Text>
          </TouchableOpacity>
        </View>
        {message && (
          <View
            style={{
              top: 20,
              alignSelf: "center",
              backgroundColor: "green",
              padding: 10,
              borderRadius: 10,
              elevation: 5,
            }}
          >
            <Text style={{ color: "#fff" }}>Appointment Successful!</Text>
          </View>
        )}
        {/* Rooom Types  */}
        <AmenCard />

        {/* <View className="pb-8">
          <Text className="text-2xl font-semibold px-6 py-10">Gallery</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {datas[0].gallery?.map((item, index) => (
              <Image
                key={index}
                source={{
                  uri: urlFor(item).width(300).url(),
                }}
                className="w-56 h-56 rounded-lg mx-3"
              />
            ))}
          </ScrollView>
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HostelScreen;
