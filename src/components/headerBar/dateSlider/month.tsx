import React, {useContext} from 'react';
import {TextComponent} from '../../../components';
import {LanguageContext} from '../../../utils/context';

const Month = ({date}: {date: Date}) => {
  const lang = useContext(LanguageContext);
  const en = lang === 'en';

  const month = date
    .toLocaleString(en ? 'en-us' : 'pl-pl', {month: 'long'})
    .toLowerCase();
  return <TextComponent className="px-4">{month}</TextComponent>;
};

export default Month;
