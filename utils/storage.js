import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to save given object to device's local storage (uses Expo SDK's AsyncStorage)
export const saveToStorage = async (data, type) => {
  try {
    // Converts JS object into a JSON object
    const serializedData = JSON.stringify(data);
    await AsyncStorage.setItem(type, serializedData);
  } catch (error) {
    console.error(`Failed to save ${type}:`, error);
  }
};

// Function to load data from device's local storage (uses Expo SDK's AsyncStorage)
export const loadFromStorage = async (type) => {
  try {
    const serializedData = await AsyncStorage.getItem(type);
    // Converts JSON object into a JS object
    return JSON.parse(serializedData);
  } catch (error) {
    console.error(`Failed to load ${type}:`, error);
  }
};