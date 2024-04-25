import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useAuth } from "../auth/AuthProvider";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(null);
  const { login } = useAuth();

  const handleLogin = () => {
    if (!email || !password) {
      // Handle missing email, password, or role
      return;
    }
    if (login(email, password)) {
      navigation.navigate("Splash");
    } else {
      navigation.navigate("Dash");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Hip</Text>

      <View style={styles.inputView}>
        <RNPickerSelect
          placeholder={{ label: "Select your Role", value: null }}
          onValueChange={(value) => setRole(value)}
          items={[
            { label: "Student", value: "student" },
            { label: "Hostel Manager", value: "hostelManager" },
          ]}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#5a189a",
    marginBottom: 40,
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
  loginBtn: {
    width: "80%",
    backgroundColor: "#5a189a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
