import React from 'react';
import {View} from 'react-native';
import TopBar from './topBar';
import dateSlider from './dateSlider';

type HeaderBarProps = {week: string; date: Date};

const HeaderBar = ({week, date}: HeaderBarProps) => (
  <View className="pb-2">
    <TopBar week={week} date={date} />
  </View>
);

export default HeaderBar;
