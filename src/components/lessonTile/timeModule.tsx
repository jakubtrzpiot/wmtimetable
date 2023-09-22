import React from 'react';
import {View} from 'react-native';
import {TextComponent, ViewComponent} from '../../components';
import {Time} from '../../types/timetable.types';

const TimeModule = ({start, end}: Time) => (
  <View className="flex-row mr-2.5 justify-end w-10">
    <View className="justify-between items-end mr-[6]">
      <TextComponent className="leading-4">{start}</TextComponent>
      <TextComponent className="leading-4">{end}</TextComponent>
    </View>
    <ViewComponent className="w-[1.75] my-[1] rounded"></ViewComponent>
  </View>
);

export default TimeModule;
