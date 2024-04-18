import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { storeUserInfo } from "../storage";

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  if (!name.trim()) {
    console.log("Name cannot be empty");
  }

  const handleLogin = () => {
    // Implement login logic here
    storeUserInfo((userInfo = name));
    navigation.replace("Home");

    console.log("Name:", name);
  };

  return (
    <View className="flex flex-1 justify-center items-center px-7">
      <Text className="text-3xl font-bold py-10">Welcome</Text>
      <TextInput
        style={styles.input}
        placeholder="enter your first Name"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity
        style={[styles.button, !name.trim() && styles.disabledButton]}
        onPress={handleLogin}
        disabled={!name.trim()}
      >
        <Text style={styles.buttonText}>get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  button: {
    width: "100%",
    height: 60,
    backgroundColor: "#007bff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LoginScreen;
