import React from 'react';
import {View} from 'react-native';
import TopBar from './topBar';
import DateSlider from './dateSlider';

interface HeaderBarProps {
  week: string;
}

const HeaderBar = ({week}: HeaderBarProps) => (
  <View className="pt-2 pb-3">
    <TopBar week={week} />
    <DateSlider />
  </View>
);

export default HeaderBar;
