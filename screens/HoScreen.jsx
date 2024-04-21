import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";

const HostelHomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Hostel Management</Text>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Hostel 1</Text>
          <Text style={styles.cardInfo}>Total Rooms: 50</Text>
          <Text style={styles.cardInfo}>Available Rooms: 10</Text>
          <Text style={styles.cardInfo}>Occupancy Rate: 80%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Hostel 2</Text>
          <Text style={styles.cardInfo}>Total Rooms: 60</Text>
          <Text style={styles.cardInfo}>Available Rooms: 20</Text>
          <Text style={styles.cardInfo}>Occupancy Rate: 66%</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Hostel 3</Text>
          <Text style={styles.cardInfo}>Total Rooms: 70</Text>
          <Text style={styles.cardInfo}>Available Rooms: 30</Text>
          <Text style={styles.cardInfo}>Occupancy Rate: 57%</Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HostelHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#5a189a",
    marginBottom: 20,
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
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
  cardTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    marginBottom: 10,
  },
  cardInfo: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  logoutButton: {
    width: "80%",
    backgroundColor: "#ff6347",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
  },
});
