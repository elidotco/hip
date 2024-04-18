import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to store an array in AsyncStorage
export const storeArrayData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error storing data:", error);
  }
};

// Function to retrieve an array from AsyncStorage
export const getArrayData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
};

// Example usage:
const updateAndStoreArray = async ({ value }) => {
  const key = "fav";

  // Retrieve existing array data
  let existingArray = (await getArrayData(key)) || [];

  // Update the array (e.g., push new item)
  existingArray.push(value);

  // Store the updated array in AsyncStorage
  await storeArrayData(key, existingArray);

  // Retrieve and log the updated array
  const updatedArray = await getArrayData(key);
  console.log("Updated array:", updatedArray);
};

// Call the function to update and store the array

// Function to store user information array in AsyncStorage
export const storeUserInfo = async (userInfo) => {
  try {
    await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
  } catch (error) {
    console.error("Error storing user information:", error);
  }
};

// Function to retrieve user information array from AsyncStorage
export const getUserInfo = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("userInfo");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error retrieving user information:", error);
    return null;
  }
};
