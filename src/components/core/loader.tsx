import React, {useContext} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {ThemeContext} from '../../utils/context';

const Loader = () => {
  const color = useContext(ThemeContext);
  return (
    <View className="flex-1 justify-center items-center bg-inherit">
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

export default Loader;
