import React, {useRef, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {range, addDays} from '../../../utils/helpers';
import DateCircle from './dateCircle';
import Month from './month';

type DateSliderProps = {date: Date};

const dateSlider = ({date}: DateSliderProps) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef?.current?.scrollToIndex({
      index: 15,
      animated: true,
      viewPosition: 0.5,
    });
  }, [date]);

  return (
    <>
      <FlatList
        data={range(-14, 14).map(i => ({date: addDays(date, i), i: i}))}
        renderItem={({item}) => <DateCircle date={item.date} i={item.i} />}
        ItemSeparatorComponent={() => <View className="w-1" />}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        getItemLayout={(data, index) => {
          return {
            length: 32,
            offset: (32 + 4) * index - 4,
            index,
          };
        }}
      />
      <Month date={date} />
    </>
  );
};

export default dateSlider;
