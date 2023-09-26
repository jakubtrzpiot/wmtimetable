import React, {useRef, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {range, addDays} from '../../../utils/helpers';
import DateCircle from './dateCircle';
import Month from './month';

interface DateSliderProps {
  date: Date;
}

const dateSlider = ({date}: DateSliderProps) => {
  const flatListRef = useRef<FlatList>(null);
  const days = 3 * 7;
  const dateArray = range(-days, days + 1).map(i => ({
    date: addDays(date, i),
    i: i,
  }));

  useEffect(() => {
    flatListRef?.current?.scrollToIndex({
      index: days + 1,
      animated: true,
      viewPosition: 0.5,
    });
  }, [date]);

  return (
    <>
      <FlatList
        data={dateArray}
        renderItem={({item}) => <DateCircle date={item.date} i={item.i} />}
        ItemSeparatorComponent={() => <View className="w-1" />}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        ListFooterComponent={() => <View className="w-2" />}
        ListHeaderComponent={() => <View className="w-2" />}
        getItemLayout={(data, index) => {
          return {
            length: 32,
            offset: (32 + 4) * index + 20,
            index,
          };
        }}
      />
      <Month date={date} />
    </>
  );
};

export default dateSlider;
