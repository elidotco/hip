import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { getArrayData, storeArrayData } from "../storage";
import { useState } from "react";
import client from "../sanity";
import { useEffect } from "react";
import { HostelCard } from "../components";

const FavScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState([]);
  const [book, setBook] = useState([]);

  let uniqueChars = datas.reduce((result, item) => {
    // Find the booking for the current hostel
    const booking = book.find((ite) => ite.hostelId === item._id);
    if (booking) {
      // If a booking is found, add the hostel along with its rooms to the result
      result.push({
        hostel: item,
        rooms: booking.room,
      });
    } else {
      // If no booking is found, add only the hostel to the result
      return;
    }
    return result;
  }, []);
  const deleteBooking = async (bookingId) => {
    try {
      // Retrieve the current list of bookings from AsyncStorage
      const existingBookings = await getArrayData("bookings");

      // Filter out the booking to be deleted
      const updatedBookings = existingBookings.filter(
        (booking) => booking.hostelId !== bookingId
      );

      storeArrayData("bokings", updatedBookings);
      // Update AsyncStorage with the updated list of bookings
      setDatas(updatedBookings);
      // Update state to reflect the change

      // Optionally, provide feedback to the user that the deletion was successful
      console.log("Booking deleted successfully.");
    } catch (error) {
      console.error("Error deleting booking:", error);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch favorite hostels and bookings from AsyncStorage
        const favs = (await getArrayData("fav")) || [];
        const bookings = (await getArrayData((key = "bookings"))) || [];
        setBook(bookings);

        // Create a string of hostel IDs for filtering
        const favHostelIds = favs.map((item) => `"${item}"`).join(",");
        const bookingHostelIds = bookings
          .map((item) => `"${item.hostelId}"`)
          .join(",");
        console.log(bookings);

        // Construct a query to fetch hostel data based on favorite hostels and bookings
        const query = `*[_type == 'hostels' && (_id in [${favHostelIds}] )] {
          _id,
          cover_image,
          name
        }`;
        const query1 = `*[_type == 'hostels' && (_id in [${bookingHostelIds}] )] {
          _id,
          cover_image,
          name
        }`;
        const response = await client.fetch(query);
        setData(response);
        const responses = await client.fetch(query1);
        setDatas(responses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(datas, book, uniqueChars);

  return (
    <View className="flex flex-1 pb-10">
      <View className="w-full bg-blue-100 h-32 flex justify-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className=" z-40 p-3 w-12 flex items-center justify-center h-12 left-5 rounded-full bg-gray-100 shadow-md absolute"
        >
          <ArrowLeftIcon />
        </TouchableOpacity>
        {/* <Text className="text-center py-6 font-bold text-xl">
          My Favorite Hostels
        </Text> */}
      </View>
      <ScrollView>
        <View className="pb-20 px-6">
          <ScrollView
            className="w-full"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {data?.map((item, index) => (
              <HostelCard key={index} data={item} one={1} />
            ))}

            <View className="pt-20 ">
              <Text className="text-2xl font-bold pb-10">BOOKiNGS</Text>

              {uniqueChars?.map((item, index) => (
                <View
                  key={index}
                  className="w-full h-56 rounded-xl flex border px-5 py-5"
                >
                  <View className=" flex flex-row justify-between">
                    <Text className="absolute top-20 text-2xl font-semibold">
                      {item.hostel.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => deleteBooking(item.hostel._id)}
                      className="ml-auto "
                    >
                      <Text>Heelo</Text>
                    </TouchableOpacity>
                  </View>
                  <View className="mt-auto flex flex-row justify-between">
                    <Text>{item.rooms}</Text>
                    <Text>{item.price}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default FavScreen;
