import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, value: object | string) => {
  try {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.error(err);
  }
};

const getItem = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    console.error(err);
  }
};

const asyncStorage = {setItem, getItem};
export default asyncStorage;
