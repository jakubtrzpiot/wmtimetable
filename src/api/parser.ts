import {DOMParser} from 'react-native-html-parser';
import {WM_URL} from './constants';

const parseTimetable = async (course: string) => {
  return await fetch(`${WM_URL}${course}.html`)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      return doc.querySelect('.tabela tr');
    })
    .catch(err => err);
};

export default parseTimetable;
