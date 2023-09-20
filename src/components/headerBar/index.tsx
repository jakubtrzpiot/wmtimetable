import React from 'react';
import {View} from 'react-native';
import WeekDay from './weekDay';
import WeekType from './weekType';

type HeaderBarProps = {day: number; week: string};

const HeaderBar = ({day, week}: HeaderBarProps) => (
  <View>
    <WeekDay dayNumber={day} />
    <WeekType weekType={week} />
  </View>
);

export default HeaderBar;
