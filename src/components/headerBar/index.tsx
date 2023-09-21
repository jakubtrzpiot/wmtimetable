import React from 'react';
import {View} from 'react-native';
import WeekDay from './weekDay';
import WeekType from './weekType';

type HeaderBarProps = {day: number; week: string; date: Date};

const HeaderBar: React.FC<HeaderBarProps> = ({
  day,
  week,
  date,
}: HeaderBarProps) => (
  <View className="px-4 fixed">
    <WeekDay day={date} />
    <WeekType weekType={week} />
  </View>
);

export default HeaderBar;
