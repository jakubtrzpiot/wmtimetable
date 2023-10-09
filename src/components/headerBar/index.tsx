import React from 'react';
import {View} from 'react-native';
import TopBar from './topBar';
import DateSlider from './dateSlider';

interface HeaderBarProps {
  week: string;
  date: Date;
}

const HeaderBar = ({week, date}: HeaderBarProps) => (
  <View className="pt-2 pb-3">
    <TopBar week={week} date={date} />
    <DateSlider date={date} />
  </View>
);

export default HeaderBar;
