import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, value: object | string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(err);
  }
};

const getItem = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.error(err);
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.error(err);
  }
};

const asyncStorage = {setItem, getItem, removeItem};
export default asyncStorage;
