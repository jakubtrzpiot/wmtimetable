import React from 'react';
import {View} from 'react-native';
import WeekDay from './weekDay';
import WeekType from './weekType';

type HeaderBarProps = {day: number; week: string};

const HeaderBar: React.FC<HeaderBarProps> = ({day, week}: HeaderBarProps) => (
  <View className="px-4 fixed">
    <WeekDay dayNumber={day} />
    <WeekType weekType={week} />
  </View>
);

export default HeaderBar;