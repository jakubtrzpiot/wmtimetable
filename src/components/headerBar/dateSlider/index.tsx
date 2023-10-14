import React, {useRef, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {range, addDays} from '../../../utils/helpers';
import DateCircle from './dateCircle';
import Month from './month';
import {Dimensions} from 'react-native';

interface DateSliderProps {
  date: Date;
}

const dateSlider = ({date}: DateSliderProps) => {
  const flatListRef = useRef<FlatList>(null);
  const days = 2 * 7;
  let dateArray = new Array(days * 2 + 1).fill(0);
  dateArray = range(-days, days + 1).map(i => ({
    date: addDays(date, i),
    i: i,
  }));

  useEffect(() => {
    const scrollToCenter = () => {
      const {width} = Dimensions.get('window');
      flatListRef?.current?.scrollToOffset({
        offset: (32 + 4) * (days + 1) - 4 + 32 / 2 - width / 2,
        animated: true,
      });
    };

    scrollToCenter();
  }, [date]);

  return (
    <>
      <FlatList
        data={dateArray}
        renderItem={({item}) => (
          <DateCircle date={item.date} i={item.i} days={days} />
        )}
        ItemSeparatorComponent={() => <View className="w-1" />}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        // ListFooterComponent={() => <View className="w-2" />}
        // ListHeaderComponent={() => <View className="w-2" />}
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
