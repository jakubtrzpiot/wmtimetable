import React, {useEffect, useState} from 'react';
import parseTimetable from '../utils/parser';
import asyncStorage from '../utils/asyncStorage';
import TimetableTemplate from '../components/timetable';
import {TimetableProps} from '../types/timetable.types';

const TimetableScreen = () => {
  const [timetable, setTimetable] = useState<TimetableProps>();

  useEffect(() => {
    const fetchTimetable = async () => {
      await asyncStorage.setItem('course', '22');
      const course = await asyncStorage.getItem('course');
      if (course == null) {
        throw new Error('No course selected');
      }
      parseTimetable(course)
        .then(data => setTimetable(data))
        .catch(err => console.error(err));
    };
    fetchTimetable();
  }, []);

  //get day as a number starting from 0 and monday
  const getDay = (): number => {
    const date = new Date();
    const day = date.getDay();
    return day === 0 ? 6 : day - 1;
  };
  const dayNumber = getDay();

  // console.log('timetableScreen:', timetable)
  return <></>;
  // return timetable && dayNumber !== 5 && dayNumber !== 6 ? (
  //   <TimetableTemplate lessons={timetable?.days[dayNumber].lessons} />
  // ) : null;
};

export default TimetableScreen;
