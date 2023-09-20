import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import {Day, Lesson} from '../types/timetable.types';
import {
  getTimetableByDay,
  getDay,
  addDays,
  getWeekType,
} from '../utils/helpers';
import HeaderBar from '../components/headerBar';
// import dateSlider from '../components/dateSlider';
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

  return (
    <View className="flex-1">
      <HeaderBar day={day} week={week} />
      <GestureRecognizer
        onSwipeLeft={() => setDate(addDays(date, 1))}
        onSwipeRight={() => setDate(addDays(date, -1))}>
        <ScrollView className="min-h-[100%]">
          {timetable &&
            timetable.map(
              (lesson: Lesson, index: number) =>
                lesson.subject && <LessonTile key={index} {...lesson} />,
            )}
        </ScrollView>
      </GestureRecognizer>
    </View>
  );
};

export default TimetableScreen;
