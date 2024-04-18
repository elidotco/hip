import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import client from "../sanity"; // Import your Sanity client instance
import { HostelCard } from "../components";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      // Query to search for hostels in Sanity
      const query = `*[_type == 'hostels' && name match $searchTerm] {
        _id,
        name,
        cover_image
        // Add other fields you want to retrieve
      }`;

      // Parameters for the query
      const params = { searchTerm };

      // Execute the query
      const response = await client.fetch(query, params);
      setSearchResults(response);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const renderItem = ({ item }) => <HostelCard data={item} one={1} />;

  return (
    <View className="flex flex-1">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute z-40 p-3 top-7 left-5 rounded-full bg-gray-100 shadow-md"
      >
        <ArrowLeftIcon />
      </TouchableOpacity>
      <View style={styles.container} className="pt-24">
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
          placeholder="Enter search term"
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <View className="px-6">
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 50,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default SearchScreen;
