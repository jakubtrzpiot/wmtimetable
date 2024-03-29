import React, {useRef, useEffect, useContext} from 'react';
import {FlatList, View} from 'react-native';
import {range, addDays} from '../../../utils/helpers';
import DateCircle from './dateCircle';
import Month from './month';
import {Dimensions} from 'react-native';
import {DateContext} from '../../../utils/context';

const dateSlider = () => {
  const {date} = useContext(DateContext);
  const flatListRef = useRef<FlatList>(null);
  const days = 4 * 7;
  let dateArray = new Array(days * 2 + 1).fill(0);
  dateArray = range(-days, days + 1).map(i => ({
    date: addDays(date, i),
    i: i,
  }));

  useEffect(() => {
    const scrollToCenter = () => {
      const {width} = Dimensions.get('window');
      const base = (32 + 4) * days + 32;
      const center = width / 2;
      const unifyweeks = (days / 7 - 1) * 16;
      flatListRef?.current?.scrollToOffset({
        offset: base - center + unifyweeks,
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
        getItemLayout={(data, index) => ({
          length: 32 + 4,
          offset: (32 + 4) * index,
          index,
        })}
        ref={flatListRef}
      />
      <Month date={date} />
    </>
  );
};

export default dateSlider;
