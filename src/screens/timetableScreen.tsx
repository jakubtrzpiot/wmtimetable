import React, {useEffect, useState} from 'react';
import parseTimetable from '../utils/parser';
import asyncStorage from '../utils/asyncStorage';
import {Timetable} from '../types/timetable.types';
import LessonTile from '../components/LessonTile';

const TimetableScreen = () => {
  const [timetable, setTimetable] = useState<Timetable>();

  useEffect(() => {
    const fetchTimetable = async () => {
      const course = await asyncStorage.getItem('course');

      if (course === null) {
        throw new Error('No course selected');
      }

      parseTimetable(course)
        .then(data => setTimetable(data))
        .catch(err => console.error(err));
    };

    fetchTimetable();
  }, []);

  return <></>;
};

export default TimetableScreen;
