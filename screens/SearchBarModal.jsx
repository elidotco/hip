import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

const BookingScreen = ({ navigation }) => {
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const prcie = {
    four: 1850,
    two: 3850,
    one: 9850,
  };

  const handleBookRoom = () => {
    // Here you can implement the logic to book the room
    console.log("Room Type:", selectedRoomType);
    console.log("Date:", selectedDate);
    console.log("Number of Guests:", numberOfGuests);
    // Example: call an API to book the room
    // After booking, you can navigate back to the previous screen
    navigation.goBack();
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
      <TouchableOpacity style={styles.bookButton} onPress={handleBookRoom}>
        <Text style={styles.buttonText}>Book</Text>
      </TouchableOpacity>
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
