import {Subject} from '../types/timetable.types';

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
