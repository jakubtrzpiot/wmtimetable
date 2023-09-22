import React from 'react';
import {View} from 'react-native';
import TopBar from './topBar';
import dateSlider from './dateSlider';

type HeaderBarProps = {week: string; date: Date};

const HeaderBar = ({week, date}: HeaderBarProps) => (
  <View className="mt-4 h-14">
    <TopBar week={week} date={date} />
  </View>
);

export default HeaderBar;
