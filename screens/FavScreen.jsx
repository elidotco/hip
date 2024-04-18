import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { getArrayData } from "../storage";
import { useState } from "react";
import client from "../sanity";
import { useEffect } from "react";
import { HostelCard } from "../components";

const FavScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favs = await getArrayData((key = "fav"));
        const favIds = favs.map((item) => `"${item}"`).join(",");

        const query = `*[_type == 'hostels' && _id in [${favIds}]
         ] {
         _id,
         cover_image,
         name
     }`;
        const response = await client.fetch(query);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View className="flex flex-1 pb-10">
      <View className="w-full bg-blue-100 h-32 flex justify-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className=" z-40 p-3 w-12 flex items-center justify-center h-12 left-5 rounded-full bg-gray-100 shadow-md absolute"
        >
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text className="text-center py-6 font-bold text-xl">
          My Favorite Hostels
        </Text>
      </View>

      <View className="pb-20 px-6">
        <ScrollView
          className="w-full"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {data?.map((item, index) => (
            <HostelCard key={index} data={item} one={1} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default FavScreen;
