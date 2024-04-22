import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { Navbar } from "../../components";

const DashScreen = () => {
  const [hostelName, setHostelName] = useState("Hostel ABC");
  const [roomTypes, setRoomTypes] = useState("Single, Double, Suite");

  const handleSave = () => {
    // Here you can implement the logic to save the updated information
    console.log("Hostel Name:", hostelName);
    console.log("Room Types:", roomTypes);
    // Example: call an API to update the hostel information
  };

  return (
    <View className="flex flex-1">
      <View style={styles.container}>
        <Navbar one={1} />
        <View className="px-5">
          <View style={styles.header}>
            <View style={styles.userContainer}>
              <View className="shadow  h-16 w-16 flex items-center rounded-full">
                <SvgUri
                  width="80%"
                  height="80%"
                  uri={`https://api.dicebear.com/8.x/miniavs/svg`}
                />
              </View>
              <Text style={styles.userName}>John Doe</Text>
            </View>
          </View>

          <Text style={styles.logo}>Hostel Name</Text>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.roomType}>4 in one </Text>
            <Text style={styles.available}>50 Available</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.roomType}>2 in one </Text>
            <Text style={styles.available}>10 Available</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.roomType}>1 in one </Text>
            <Text style={styles.available}>30 Available</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

    marginBottom: 20,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  notificationIcon: {
    width: 30,
    height: 30,
    backgroundColor: "#5a189a",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#5a189a",
    marginBottom: 20,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#003f5c",
  },
  saveButton: {
    width: "80%",
    backgroundColor: "#5a189a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
  },
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  roomType: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    marginBottom: 10,
  },
  available: {
    fontSize: 16,
    color: "#555",
  },
});
