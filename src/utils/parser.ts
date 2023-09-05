import {DOMParser as parser} from 'react-native-html-parser';
import {WM_URL} from '../constants';
import {transpose} from './helpers';
import {TimetableProps} from '../types/timetable.types';

const parseTimetable = async (course: number): Promise<TimetableProps> => {
  return await fetch(`${WM_URL}${course}.html`)
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
          const subject =
            lesson.childNodes.length <= 1
              ? null
              : Array.from(lesson.childNodes, (child: any) => {
                  if (!child.attributes && child.data.trim()) {
                    return child.data;
                  } else if (child.attributes) {
                    // switch (child.attributes[0].value) {
                    //   case 'p':
                    //     subject.name = child.firstChild.data;
                    //     break;
                    //   case 'n':
                    //     subject.teacher = child.firstChild.data;
                    //     break;
                    //   case 's':
                    //     subject.room = child.firstChild.data;
                    //     break;
                    // }
                  }
                });
          return {
            time,
            subject,
          };
        });
      });
      console.log('timeatable', timetable);

      return {} as TimetableProps;
    })
    .catch(err => err);
};

export default parseTimetable;
