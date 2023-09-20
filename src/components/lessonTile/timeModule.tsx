import React from 'react';
import {View} from 'react-native';
import {TextComponent} from '../../components';
import {Time} from '../../types/timetable.types';

const TimeModule = ({start, end}: Time) => (
  <View className="mr-2 justify-between">
    <TextComponent className="">{start}</TextComponent>
    <TextComponent className="">{end}</TextComponent>
  </View>
);

export default TimeModule;
