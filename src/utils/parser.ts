import {parse} from 'himalaya';
import {WM_URL} from '../constants';
import {transpose} from './helpers';
import TimetableProps from '../types/timetable.types';

const parseTimetable = async (course: number): Promise<TimetableProps> => {
  return await fetch(`${WM_URL}${course}.html`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok.');
      }
      return res.text();
    })
    .then(html => {
      const parsed = parse(html.replace(/(\r\n|\n|\r)/gm, ''));
      const table =
        parsed[0].children[1].children[1].children[0].children[0].children[0].children[0].children.map(
          (row: any) =>
            row.children.map((cell: any) =>
              cell.children[0].type === 'text'
                ? cell.children[0].content === '&nbsp;'
                  ? null
                  : cell.children[0].content
                : cell.children[0].type === 'element' &&
                  cell.children[0].children.length === 1
                ? cell.children[0].children[0].content
                : cell.children[0].children.map((child: any) =>
                    child.type === 'element' ? child.children[0].content : null,
                  ),
            ),
        );

      const hours = table
        .slice(1)
        .map((row: any) => row[1].replace(/(\s)/gm, '').split('-'));

      const days = transpose(table)
        .slice(2)
        .map((day: any) => {
          return {
            day: day[0],
            periods: day.slice(1).map((subject: any, i: number) => {
              subject && Array.isArray(subject)
                ? (subject = {
                    name: subject[0],
                    teacher: subject[2],
                    room: subject[4],
                  })
                : subject
                ? (subject = {name: subject})
                : null;
              return {
                time: {start: hours[i][0], end: hours[i][1]},
                subject: subject,
              };
            }),
          };
        });

      const timetable = {
        course:
          parsed[0].children[1].children[0].children[0].children[0].children[1]
            .children[0].content,
        days: days,
      };

      return timetable as TimetableProps;
    })
    .catch(err => err);
};

export default parseTimetable;
