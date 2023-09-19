import {DOMParser as parser} from 'react-native-html-parser';
import {WM_URL} from '../constants';
import {transpose, unwrap} from './helpers';
import {Timetable} from '../types/timetable.types';

const parseTimetable = async (course: number): Promise<Timetable> => {
  return await fetch(`${WM_URL}o${course.toString()}.html`)
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

      return timetable as Timetable;
    })
    .catch(err => err && console.error(err.message));
};

export default parseTimetable;
