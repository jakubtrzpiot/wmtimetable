import React from 'react';
import {View} from 'react-native';
import TopBar from './topBar';
import DateSlider from './dateSlider';

type HeaderBarProps = {week: string; date: Date};

const HeaderBar = ({week, date}: HeaderBarProps) => (
  <View className="py-2">
    <TopBar week={week} date={date} />
    <DateSlider date={date} />
  </View>
);

export default HeaderBar;
