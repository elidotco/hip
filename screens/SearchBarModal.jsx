import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

import {
  collection,
  addDoc,
  serverTimestamp,
  getDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../auth/AuthProvider";
import { db } from "../services/config";

// Function to accept a student's booking

const BookingScreen = ({ navigation, route }) => {
  const { id, name } = route.params;
  const [user, setUser] = useState();

  const { users } = useAuth();

  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [message, setMessage] = useState(false);
  const prcie = {
    four: 1850,
    two: 3850,
    one: 9850,
  };

  useEffect(() => {
    const checkUserInfo = async () => {
      const docRef = doc(db, "users", users);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
      }
    };
    checkUserInfo(); // Call the function to check user information
  }, []);

  const price =
    selectedRoomType === "four"
      ? prcie.four
      : selectedRoomType === "two"
      ? prcie.two
      : selectedRoomType === "one"
      ? prcie.one
      : "";

  const bookingData = {
    roomType: selectedRoomType,
    studentName: user?.firstName + " " + user?.lastName,
    studentId: users,
    hosteId: id,
    price: price,
    hostelName: name,
  };

  const acceptBooking = async () => {
    try {
      // Add booking data to Firestore
      const docRef = await addDoc(collection(db, "bookings"), {
        ...bookingData,
        timestamp: serverTimestamp(), // Add server timestamp for tracking booking time
        approved: "Waiting",
      });
      console.log("Booking added with ID: ", docRef.id);
      return true; // Return true indicating successful booking acceptance
    } catch (error) {
      console.error("Error adding booking: ", error);
      return false; // Return false indicating failed booking acceptance
    }
  };

  const handleSubmit = async () => {
    // Call acceptBooking function with bookingData
    if (selectedRoomType === "" || selectedDate === "") {
      return;
    }
    const success = await acceptBooking(bookingData);
    if (success) {
      // Handle success (e.g., show success message, clear form fields)
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 2000);
      navigation.goBack();
      console.log("Booking accepted successfully!");
    } else {
      // Handle failure (e.g., show error message)
      console.log("Failed to accept booking.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book a Room</Text>

      <View style={styles.input} className="items-center flex justify-center">
        <RNPickerSelect
          placeholder={{ label: "Select Room Type", value: null }}
          onValueChange={(value) => setSelectedRoomType(value)}
          items={[
            { label: "Four In A Room", value: "four" },
            { label: "Two In A Room", value: "two" },
            { label: "One In A Room", value: "one" },
          ]}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Date"
        value={selectedDate}
        onChangeText={setSelectedDate}
      />
      <View className="flex flex-row gap-5 py-4">
        <Text className="text-xl">
          Price:
          {selectedRoomType === "four"
            ? prcie.four
            : selectedRoomType === "two"
            ? prcie.two
            : selectedRoomType === "one"
            ? prcie.one
            : ""}
        </Text>
      </View>
      <TouchableOpacity style={styles.bookButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Book</Text>
      </TouchableOpacity>
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
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  bookButton: {
    backgroundColor: "#5a189a",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
