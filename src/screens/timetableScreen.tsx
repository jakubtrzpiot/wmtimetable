import React, {useState, useEffect} from 'react';
import {Day, Lesson} from '../types/timetable.types';
import {getTimetableByDay, getDay, getWeekType} from '../utils/helpers';
import LessonTile from '../components/lessonTile';

const TimetableScreen = () => {
  const [timetable, setTimetable] = useState<Day>();
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const day = getDay(date);
    const week = getWeekType(date);

    getTimetableByDay(day, week)
      .then((data: Day) => setTimetable(data))
      .catch(err => console.log(err));
  }, [date]);

  console.log('timetable:', timetable);

  return (
    timetable &&
    timetable.map((lesson: Lesson, index: number) => (
      <LessonTile key={index} {...lesson} />
    ))
  );
};

export default TimetableScreen;
