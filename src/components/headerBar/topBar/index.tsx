import React from 'react';
import {View} from 'react-native';
import WeekDay from './weekDay';
import WeekType from './weekType';

type TopBarProps = {week: string; date: Date};

const TopBar: React.FC<TopBarProps> = ({week, date}: TopBarProps) => (
  <View className="px-4">
    <WeekDay day={date} />
    <WeekType weekType={week} />
  </View>
);

export default TopBar;
