import React from 'react';
import {View} from 'react-native';
import {TextComponent} from '..';

const Empty = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <TextComponent className="text-base">No lessons</TextComponent>
    </View>
  );
};

export default Empty;
