import {DOMParser as parser} from 'react-native-html-parser';
import {WM_URL} from './constants';
import {Timetable, Subject, Lesson} from '../interfaces/timetable.interfaces';
import asyncStorage from './asyncStorage';

const transpose = (array: Array<any>) => {
  return array[0].map((_: any, i: number) => {
    return array.map(col => {
      return col[i];
    });
  });
};

const unwrap = (node: any) => {
  if (node.childNodes.length > 1 || node.firstChild.childNodes) {
    //one or more subjects
    return Array.from(node.getElementsByAttribute('class', 'p'))
      .filter(
        (subject: any) =>
          subject.firstChild.nodeValue.split(' ')[0].trim()[0] !== '#',
      )
      .map((subject: any, index: number) => {
        const p = subject.firstChild.nodeValue.replace(/  +/g, ' ');
        const name =
          p.substr(0, 2) === 'J '
            ? p.split(' ').slice(0, 2).join(' ').trim().split('-')[0]
            : p.split(' ')[0].trim();

        let week, teacher;
        try {
          week = p
            .split(' ')[1]
            .split('-')[1]
            .trim()
            .replace(/[()]/g, '')
            .replace('.', '')
            .toLowerCase()[0];
        } catch (err) {
          week = subject.nextSibling.nodeValue
            .trim()
            .replace(/[()\-0-9]/g, '')
            .replace('.', '')
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
            ? 'j'
            : p.trim().split(' ')[1].split('-')[0].toLowerCase();

        let type = t[0];

        const group =
          t.length > 1
            ? t
            : type === 'j'
            ? subject.nextSibling.nextSibling.firstChild.nodeValue
                .replace('#', '')
                .toLowerCase()
            : ['ć', 'w'].includes(type)
            ? 'all'
            : null;

        let room = node
          .getElementsByAttribute('class', 's')
          [index].firstChild.nodeValue.split('-')
          .slice(0, -1)
          .join('-')
          .split('/')[0];
        room === 'e-learning' ? (room = 'ONLINE') : null;

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
    return [];
  }
};

const stripNullValuesFromEdges = (array: Array<any>) => {
  // Remove null values from the beginning of the array
  while (array.length > 0 && array[0].subject === null) {
    array.shift();
  }

  // Remove null values from the end of the array
  while (array.length > 0 && array[array.length - 1].subject === null) {
    array.pop();
  }

  return array;
};

const filter = (timetable: Timetable, groups: Array<string>) => {
  const byWeek = (week: string) =>
    timetable.map(
      day =>
        day &&
        stripNullValuesFromEdges(
          day.map(({time, subject}: Lesson) => ({
            time,
            subject:
              (subject as Subject[])?.filter(
                subject =>
                  groups.includes(subject.group) && subject.week.includes(week),
              )[0] || null,
          })),
        ),
    );

  const result = [...byWeek('n'), [], [], ...byWeek('p'), [], []];
  // console.log(result);
  return result;
};

export const parseTimetable = async (course: number): Promise<Timetable> => {
  const groups = await asyncStorage.getItem('groups');
  return await fetch(`${WM_URL}o${course}.html`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok.');
      }
      return res.text();
    })
    .then(html => {
      const doc = new parser().parseFromString(
        html.replace(/(\r\n|\n|\r)/gm, ''),
        'text/html',
      );

      const transposed = transpose(
        Array.from(
          doc.getElementsByAttribute('class', 'tabela')[0].childNodes,
          (row: any) => Array.from(row.childNodes),
        ).slice(1),
      ).slice(1);

      const hours = transposed[0].map((hour: any) => {
        hour = hour.firstChild.data.replace(/(\s)/gm, '').split('-');
        return {start: hour[0], end: hour[1]};
      });

      let timetable = transposed.slice(1).map((day: any) => {
        return day.map((lesson: any, i: number) => {
          const time = hours[i];
          return {
            time,
            subject: unwrap(lesson) || [],
          };
        });
      });

      interface LessonProps {
        dayIndex: number;
        lessonIndex: number | number[];
        subject: {
          name: string;
          group?: string;
          week?: string;
          type?: string;
          teacher?: string;
          room?: string;
        };
      }

      const insertLessons = ({lessonIndex, dayIndex, subject}: LessonProps) => {
        for (let idx of lessonIndex as number[]) {
          timetable[dayIndex][idx].subject.push(subject);
        }
      };

      const lessonsToInsert: LessonProps[] = [
        {
          dayIndex: 0,
          lessonIndex: [10, 11],
          subject: {
            name: 'J angielski',
            group: 'dg3',
            week: 'pn',
            type: 'j',
            teacher: 'DG',
            room: 'IDK',
          },
        },
        {
          dayIndex: 0,
          lessonIndex: [12, 13],
          subject: {
            name: 'J angielski',
            group: 'dg4',
            week: 'pn',
            type: 'j',
            teacher: 'DG',
            room: 'IDK',
          },
        },
      ];

      lessonsToInsert.map(lesson => insertLessons(lesson));

      const deleteLessons = ({lessonIndex, dayIndex, subject}: LessonProps) => {
        for (let idx of lessonIndex as number[]) {
          let subjectIndex = 0;
          while (subjectIndex > -1) {
            subjectIndex = timetable[dayIndex][idx].subject
              .slice(subjectIndex)
              .findIndex((s: Subject) => s.name === subject.name);

            timetable[dayIndex][idx].subject.pop(subjectIndex);
          }
        }
      };

      const lessonsToDelete: LessonProps[] = [
        {
          dayIndex: 4,
          lessonIndex: [10, 11, 12, 13],
          subject: {name: 'J angielski'},
        },
      ];

      lessonsToDelete.map(lesson => deleteLessons(lesson));

      timetable = filter(timetable, groups);

      return timetable;
    })
    .catch(err => err && console.error(err, 'parseTimetable'));
};

//parse course name
export const parseCourseName = async (course: number): Promise<string> => {
  return await fetch(`${WM_URL}o${course}.html`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok.');
      }
      return res.text();
    })
    .then(html => {
      const doc = new parser().parseFromString(
        html.replace(/(\r\n|\n|\r)/gm, ''),
        'text/html',
      );

      return doc.getElementsByAttribute('class', 'tytulnapis')[0].firstChild
        .nodeValue;
    });
};
