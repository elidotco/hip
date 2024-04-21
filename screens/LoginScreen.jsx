import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Hip</Text>

      <View style={styles.inputView}>
        <RNPickerSelect
          placeholder={{ label: "Select your Role", value: null }}
          onValueChange={(value) => console.log(value)}
          items={[
            { label: "JavaScript", value: "JavaScript" },
            { label: "TypeScript", value: "TypeScript" },
            { label: "Python", value: "Python" },
            { label: "Java", value: "Java" },
            { label: "C++", value: "C++" },
            { label: "C", value: "C" },
          ]}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#003f5c"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.navigate("Ho")}
      >
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
