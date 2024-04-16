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
        setDatas(data);
        setLoading(false);
      });
  }, []);
  console.log(datas);
  if (loading) {
    return <Text>Loading...</Text>; // Render loading indicator while data is being fetched
  }
  return (
    <SafeAreaView className="h-full">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute z-40 p-3 top-7 left-5 rounded-full bg-gray-100 border"
      >
        <ArrowLeftIcon />
      </TouchableOpacity>
      <View className="h-[50%] ">
        <Image
          source={{
            uri: urlFor(datas[0].cover_image).width(500).url(),
          }}
          className="w-full h-full absolute "
        />
        <View className="mt-auto px-6 pb-9 flex flex-row justify-between items-center text-white">
          <Text className="text-white font-semibold text-2xl">
            {datas[0].name}
          </Text>
          <TouchableOpacity onPress={() => setFav(!fav)}>
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
          <Text className="text-xl ">3km</Text>
        </View>

        <View className="flex flex-row px-6 py-5 items-center">
          <MapIcon size={30} />
          <Text className="text-lg">Unity Street vsa,3</Text>
        </View>
        <View className="flex flex-row pt-10 items-center  gap-1 px-6">
          <Text className="text-base font-medium">Email :</Text>
          <Text>hostelcom@gmail.com</Text>
        </View>
        <View className="flex flex-row py-6  items-center px-6 gap-1">
          <Text className="text-base font-medium">Phone Number :</Text>
          <Text>+2334552642844</Text>
        </View>

        {/* Rooom Types  */}
        <View>
          <Text className="px-6 text-xl font-semibold py-6">Room Types</Text>

          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <RoomCard />
            <RoomCard />
            <RoomCard />
            <RoomCard />
          </ScrollView>
        </View>
        {/* Rooom Types  */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HostelScreen;
