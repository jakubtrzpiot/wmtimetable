import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {range, addDays} from '../../../utils/helpers';
import DateCircle from './dateCircle';
import Month from './month';

type DateSliderProps = {date: Date};

const dateSlider = ({date}: DateSliderProps) => {
  return (
    <>
      <FlatList
        data={range(-14, 14).map(i => ({date: addDays(date, i), i: i}))}
        renderItem={({item}) => <DateCircle date={item.date} i={item.i} />}
        ItemSeparatorComponent={() => <View className="w-1" />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <Month date={date} />
    </>
  );
};

export default dateSlider;
