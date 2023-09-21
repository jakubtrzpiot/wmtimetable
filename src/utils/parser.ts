import {DOMParser as parser} from 'react-native-html-parser';
import {WM_URL} from './constants';
import {Timetable, Subject} from '../types/timetable.types';

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
        const p = subject.firstChild.nodeValue;
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
            ? 'j'
            : p.split(' ')[1].trim().split('-')[0].toLowerCase();

        let type = t[0];
        const group =
          t.length > 1
            ? t
            : type === 'j'
            ? subject.nextSibling.nextSibling.firstChild.nodeValue
                .replace('#', '')
                .toLowerCase()
            : 'all';

        let room = node
          .getElementsByAttribute('class', 's')
          [index].firstChild.nodeValue.split('-')
          .slice(0, -1)
          .join('-')
          .split('/')[0];
        room === 'e-learning' ? (room = 'ONLINE') : null;

        switch (type) {
          case 'j':
            type = 'english';
            break;
          case 'w':
            type = 'lecture';
            break;
          case 'ć':
            type = 'practical';
            break;
          case 'l':
            type = 'lab';
            break;
          case 's':
            type = 'seminar';
            break;
          case 'p':
            type = 'project';
            break;
          case 'k':
            type = 'computer lab';
            break;
          default:
        }
        type = type[0].toUpperCase() + type.slice(1);

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

export const parseTimetable = async (course: number): Promise<Timetable> => {
  console.log('course:', course);
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

      const timetable = transposed.slice(1).map((day: any) => {
        return day.map((lesson: any, i: number) => {
          const time = hours[i];
          return {
            time,
            subject: unwrap(lesson) || null,
          };
        });
      });

      // console.log('timetable:', timetable);
      return timetable as Timetable;
    })
    .catch(err => err && console.error(err.message));
};

// export const parseCourses = async (): Promise<number[]> => {
//   return await fetch(`${WM_URL}index.html`)
//     .then(res => {
//       if (!res.ok) {
//         throw new Error('Network response was not ok.');
//       }
//       return res.text();
//     })
//     .then(html => {
//       const doc = new parser().parseFromString(
//         html.replace(/(\r\n|\n|\r)/gm, ''),
//         'text/html',
//       );

//       const courses = Array.from(
//         doc.getElementsByAttribute('class', 'tabela')[0].childNodes,
//         (row: any) => Array.from(row.childNodes),
//       )
//         .slice(1)
//         .map((row: any) => row[0].firstChild.data.trim());

//       console.log(courses);

//       return courses;
//     })
//     .catch(err => err && console.error(err.message));
// };
