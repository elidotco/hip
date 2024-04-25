import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { db } from "../services/config";
import { doc, setDoc } from "firebase/firestore";

const ApproveCard = ({ id, data }) => {
  const [ref, setRef] = useState("");
  const [mess, setMess] = useState(false);
  console.log(id);
  const approve = async () => {
    try {
      const docRef = doc(db, "bookings", id);
      await setDoc(docRef, { approved: "Yes" }, { merge: true });
      console.log("Document updated successfully!");
      setRef("yes");
      setMess(true);
      setTimeout(() => {
        setMess(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  const decline = async () => {
    try {
      const docRef = doc(db, "bookings", id);
      await setDoc(docRef, { approved: "No" }, { merge: true });
      console.log("Document updated successfully!");
      setRef("yes");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };
  return (
    <View className="flex relative w-full h-64 mb-6 px-5 py-5 bg-white shadow-md rounded-lg">
      {mess ? (
        <Text className="text-green-500 absolute top-5 right-5">
          Booking Updated
        </Text>
      ) : (
        ""
      )}
      <View className="flex ">
        <Text className="text-lg py-2  w-full ">{data.studentName}</Text>
        <Text className="text-lg py-2 capitalize ">
          {data.roomType} In a Room
        </Text>
        <Text className="text-lg py-2">Male</Text>
        <Text
          className="text-lg  absolute bottom-12 right-2
      "
        >
          {data.price}
        </Text>
      </View>
      <View className="mt-auto flex flex-row ml-auto">
        <TouchableOpacity
          onPress={decline}
          className="rounded-lg w-24 mr-5 p-5 bg-red-500"
        >
          <Text className="text-white">Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-lg w-24  p-5 bg-green-500"
          onPress={approve}
        >
          <Text className="text-white">Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ApproveCard;
