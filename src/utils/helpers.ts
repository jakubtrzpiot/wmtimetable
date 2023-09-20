import {Lesson, Subject} from '../types/timetable.types';
import asyncStorage from './asyncStorage';
import {parseTimetable} from './parser';

//get day as a number starting from 0 and monday
export const getDay = (date: Date): number => {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
};

//add days to date
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

//check if week is even or odd and return 'p' or 'n'
export const getWeekType = (date: Date): string => {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    ((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay()) / 7,
  );

  return weekNumber % 2 === 0 ? 'p' : 'n';
};

export const setInitialValues = async (
  course: number,
  groups: Array<string>,
) => {
  groups.map((group: string) =>
    group !== 'all' && !/\d/.test(group)
      ? groups.push([...group].reverse().join(''))
      : group,
  );
  try {
    await asyncStorage.setItem('course', course.toString()); // 22
    await asyncStorage.setItem('groups', groups); // ['l06', 'k05', 'p05', 'dg3', 'all']
  } catch (err) {
    console.error(err);
  }
};

export const getTimetableByDay = async (day: number, week: string) => {
  try {
    const timetable = await asyncStorage.getItem('timetable');
    const groups = await asyncStorage.getItem('groups');

    const result = timetable[day]?.map(({time, subject}: Lesson) => ({
      time,
      subject:
        (subject as Subject[])?.filter(
          subject => groups.includes(subject.group) && subject.week === week,
        )[0] || null,
    }));

    return result;
  } catch (err) {
    console.error(err);
  }
};

export const setTimetable = async () => {
  try {
    const course = await asyncStorage.getItem('course');
    //set fetch timestamp maybe

    if (course === null) {
      throw new Error('No course selected');
    }

    const timetable = await parseTimetable(course);
    await asyncStorage.setItem('timetable', timetable);
  } catch (err) {
    console.error(err);
  }
};

// export const getCourse = async () => {
//   try {
//     return await parseCourses();
//   } catch (err) {
//     console.error(err);
//   }
// };
