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

//check if week is even or odd and return 'p' or 'n' starting from monday
export const getWeekType = (date: Date): string => {
  const weekNumber = Math.ceil(
    (date.getTime() -
      24 * 60 * 60 * 1000 -
      new Date(date.getFullYear(), 0, 1).getTime()) /
      (7 * 24 * 60 * 60 * 1000),
  );

  return weekNumber % 2 ? 'n' : 'p';
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

    const result = timetable[day]
      ? timetable[day]?.map(({time, subject}: Lesson) => ({
          time,
          subject:
            (subject as Subject[])?.filter(
              subject =>
                groups.includes(subject.group) && subject.week === week,
            )[0] || null,
        }))
      : null;

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
    //set item in async storage only if it's not the same as the one already there
    !(await asyncStorage.getItem('timetable'))
      ? (await asyncStorage.setItem('timetable', timetable),
        console.log('Timetable set'))
      : null;
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
