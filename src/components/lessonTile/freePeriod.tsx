import React from 'react';
import {View} from 'react-native';
import {IconComponent, TextComponent} from '../core';

const FreePeriod = () => (
  <View className="grow items-center mx-4 justify-start flex-row">
    <IconComponent disabled center name="bomb" size={32} />
    <TextComponent className="text-lg ml-4 mr-3">Wycziluj bombe</TextComponent>
    <IconComponent disabled center name="bomb" size={32} />
  </View>
);

export default FreePeriod;
