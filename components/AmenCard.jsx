import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { WifiIcon } from "react-native-heroicons/solid";

const AmenCard = ({
  hostelName,
  amenities = ["WIFI", "Water", "Electricity", "Study Room", "Airconditioning"],
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Amenities</Text>
      <View style={styles.amenitiesContainer}>
        {amenities.map((amenity, index) => (
          <Text key={index} style={styles.amenity}>
            {amenity}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default AmenCard;

const styles = StyleSheet.create({
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
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#333",
    marginBottom: 10,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  amenity: {
    backgroundColor: "#5a189a",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
});
