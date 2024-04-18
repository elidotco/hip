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

const HostelScreen = ({ route, navigation }) => {
  const [fav, setFav] = useState(false);
  const [id] = useState(route.params.id);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(
        `
        *[_type=='hostels' && _id==$id][]`,
        { id }
      )
      .then((data) => {
        console.log("Hostel data:", data); // Log hostel data to check if it's fetched properly
        setDatas(data);
        setLoading(false);
      });
  }, []);

  const checkfav = async () => {
    if (datas.length > 0) {
      const favs = (await getArrayData((key = "fav"))) || []; // Get user's favorite hostels

      if (favs.includes(datas[0]?._id)) {
        // Use optional chaining to avoid errors
        setFav(true);
      }
    }
  };

  useEffect(() => {
    checkfav();
  }, [datas]);

  const toggleFavorite = async () => {
    if (datas.length > 0) {
      setFav(!fav); // Toggle favorite state
      const favs = (await getArrayData((key = "fav"))) || []; // Get user's favorite hostels
      const hostelId = datas[0]._id;
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
            uri: urlFor(datas[0].cover_image).width(500).url(),
          }}
          className="w-full h-full"
        />
        <View className="mt-auto px-6 pb-9 flex flex-row justify-between items-center text-white">
          <Text className="text-white font-semibold text-2xl">
            {datas[0].name}
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
          <Text className="text-xl ">{datas[0].distance}km</Text>
        </View>

        <View className="flex flex-row px-6 py-5 items-center">
          <MapIcon size={30} />
          <Text className="text-lg">{datas[0].address}</Text>
        </View>

        <View className="flex flex-row pb-6  items-center px-6 gap-1">
          <Text className="text-base font-medium">Phone Number :</Text>
          <Text>{datas[0].phone_number}</Text>
        </View>

        {/* Rooom Types  */}
        <View>
          <Text className="px-6 text-xl font-semibold py-6">Room Types</Text>

          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {datas[0].room_types?.map((item, index) => (
              <RoomCard key={index} data={item} />
            ))}

            {/* <RoomCard />
            <RoomCard />
            <RoomCard /> */}
          </ScrollView>
        </View>
        {/* Rooom Types  */}

        <View className="pb-8">
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HostelScreen;
