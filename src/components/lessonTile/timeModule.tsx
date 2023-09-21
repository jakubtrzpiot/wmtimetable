import React from 'react';
import {View} from 'react-native';
import {TextComponent} from '../../components';
import {Time} from '../../types/timetable.types';

const TimeModule = ({start, end}: Time) => (
  <View className="grow flex-row mr-2 justify-end">
    <View className="justify-between items-end mr-[5]">
      <TextComponent className="leading-4">{start}</TextComponent>
      <TextComponent className="leading-4">{end}</TextComponent>
    </View>
    <View className="w-[1.75] mb-[3.5] rounded bg-slate-300"></View>
  </View>
);

export default TimeModule;
