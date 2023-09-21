import React from 'react';
import {View} from 'react-native';
import {TextComponent} from '../../components';
import {Time} from '../../types/timetable.types';

const TimeModule = ({start, end}: Time) => (
  <View className="grow flex-row mr-2 justify-end">
    <View className="justify-between items-end mr-[5]">
      <TextComponent className="">{start}</TextComponent>
      <TextComponent className="">{end}</TextComponent>
    </View>
    <View className="w-[1.25] my-[2] rounded bg-slate-200"></View>
  </View>
);

export default TimeModule;
