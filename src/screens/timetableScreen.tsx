import React, {useState, useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Day} from '../types/timetable.types';
import {
  getTimetableByDay,
  getDay,
  addDays,
  getWeekType,
} from '../utils/helpers';
import {SwipeComponent} from '../components';
import HeaderBar from '../components/headerBar';
import LessonTile from '../components/lessonTile';
import Empty from '../components/lessonTile/empty';

const TimetableScreen = () => {
  const [timetable, setTimetable] = useState<Day>();
  const [date, setDate] = useState<Date>(new Date());
  const [week, setWeek] = useState<string>('');

  useEffect(() => {
    const day = getDay(date);

    const week = getWeekType(date);
    setWeek(week);

    getTimetableByDay(day, week)
      .then((data: Day) => setTimetable(data))
      .catch(err => console.log(err));
  }, [date]);

  const handleSwipe = (dir: string) => {
    switch (dir) {
      case 'left':
        setDate(addDays(date, 1));
        break;
      case 'right':
        setDate(addDays(date, -1));
        break;
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <HeaderBar week={week} date={date} />
      <SwipeComponent onSwipe={dir => handleSwipe(dir)}>
        <FlatList
          className="min-h-full pt-2 px-4"
          data={timetable}
          renderItem={({item}) => <LessonTile {...item} />}
          ItemSeparatorComponent={() => <View className="h-4" />}
          ListEmptyComponent={() => <Empty />}
          ListFooterComponent={() => (
            <View className="h-[72]" /> // Add space at the bottom
          )}
        />
      </SwipeComponent>
    </SafeAreaView>
  );
};
//TODO get the metarial ui colors

export default TimetableScreen;
