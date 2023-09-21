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
import {TextComponent, SwipeComponent} from '../components';
import HeaderBar from '../components/headerBar';
import LessonTile from '../components/lessonTile';

const TimetableScreen = () => {
  const [timetable, setTimetable] = useState<Day>();
  const [date, setDate] = useState<Date>(new Date());
  const [day, setDay] = useState<number>(0);
  const [week, setWeek] = useState<string>('');

  useEffect(() => {
    const day = getDay(date);
    const week = getWeekType(date);

    setDay(day);
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
      <HeaderBar day={day} week={week} />
      <SwipeComponent onSwipe={dir => handleSwipe(dir)}>
        <FlatList
          className="min-h-full"
          data={timetable}
          renderItem={({item}) =>
            item.subject ? <LessonTile {...item} /> : null
          }
          ListEmptyComponent={<TextComponent>Empty</TextComponent>}
          ListFooterComponent={() => (
            <View style={{height: 60}} /> // Add space at the bottom
          )}
        />
      </SwipeComponent>
    </SafeAreaView>
  );
};
//get the metarial ui color
//change the font

export default TimetableScreen;
