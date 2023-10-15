import React, {useContext} from 'react';
import {TextComponent} from '../../core';
import {LanguageContext} from '../../../utils/context';

interface WeekType {
  weekType: string;
}

const WeekType = ({weekType}: WeekType) => {
  const lang = useContext(LanguageContext);
  const en = lang === 'en';
  return (
    <TextComponent className="-mt-1">
      {(weekType === 'p'
        ? en
          ? 'even'
          : 'parzysty'
        : en
        ? 'odd'
        : 'nieparzysty'
      ).toUpperCase()}
    </TextComponent>
  );
};

export default WeekType;
