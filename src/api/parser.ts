import {parse} from 'himalaya';
import {WM_URL} from './constants';
import Timetable from '../interfaces/parser.interfaces';

const parseTimetable = async (course: string): Promise<Timetable> => {
  return await fetch(`${WM_URL}${course}.html`)
    .then(res => res.text())
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
                : cell.children[0].children[0].content ||
                  cell.children[0].children[0].children[0].content,
            ),
        );

      const hours = table
        .slice(1)
        .map((row: any) => row[1].replace(/(\s)/gm, '').split('-'));

      const days = table;

      const timetable: Timetable = {
        course: course,
        hours: hours,
        days: days,
      };

      return timetable;
    })
    .catch(err => err);
};

export default parseTimetable;
