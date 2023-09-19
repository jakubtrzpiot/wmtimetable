import {Lesson, Subject} from '../types/timetable.types';
import asyncStorage from './asyncStorage';
import parseTimetable from './parser';

export const transpose = (array: Array<any>) => {
  return array[0].map((row: any, i: number) => {
    return array.map(col => {
      return col[i];
    });
  });
};

export const unwrap = (node: any) => {
  if (node.childNodes.length > 1 || node.firstChild.childNodes) {
    //one or more subjects
    return Array.from(node.getElementsByAttribute('class', 'p'))
      .filter(
        (subject: any) =>
          subject.firstChild.nodeValue.split(' ')[0].trim()[0] !== '#',
      )
      .map((subject: any, index: number) => {
        const p = subject.firstChild.nodeValue;
        const name =
          p.substr(0, 2) === 'J '
            ? p.split(' ').slice(0, 2).join(' ').trim()
            : p.split(' ')[0].trim();

        let week, teacher;
        try {
          week = p
            .split(' ')[1]
            .split('-')[1]
            .trim()
            .replace(/[()]/g, '')
            .toLowerCase()[0];
        } catch (err) {
          week = subject.nextSibling.nodeValue
            .trim()
            .replace(/[()\-0-9]/g, '')
            .toLowerCase();
        }

        try {
          teacher = node
            .getElementsByAttribute('class', 'n')
            [index].firstChild.nodeValue.toUpperCase();
        } catch (err) {
          teacher = subject.nextSibling.nextSibling.firstChild.nodeValue
            .slice(1)
            .replace(/[0-9]/g, '')
            .toUpperCase();
        }

        const t =
          p.substr(0, 2) === 'J '
            ? ['j']
            : p.split(' ')[1].trim().split('-')[0].toLowerCase();

        const type = t[0];
        const group =
          t.length > 1
            ? t
            : type === 'j'
            ? subject.nextSibling.nextSibling.firstChild.nodeValue.slice(1)
            : 'all';

        const room = node
          .getElementsByAttribute('class', 's')
          [index].firstChild.nodeValue.split('-')
          .slice(0, -1)
          .join('-');

        return {
          name,
          type,
          group,
          week,
          teacher,
          room,
        } as Subject;
      });
  } else {
    //no subject
    return null;
  }
};

//get day as a number starting from 0 and monday
export const getDay = (date: Date): number => {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
};

//check if week is even or odd and return 'p' or 'n'
export const getWeekType = (date: Date): string => {
  const onejan = new Date(date.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    ((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7,
  );

  return weekNumber % 2 === 0 ? 'p' : 'n';
};

export const setInitialValues = async (
  course: number,
  groups: Array<string>,
) => {
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

    // unwrap(lesson)?.filter(
    //   (subject: Subject) =>
    //     groups.includes(subject.group) && subject.week === week,
    // )[0] || null,

    return timetable[day]?.map(({time, subject}: Lesson) => ({
      time,
      subject:
        subject?.filter(
          subject => groups.includes(subject.group) && subject.week === week,
        )[0] || null,
    }));
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
