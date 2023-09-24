import React, {useContext} from 'react';
import {TextComponent} from '../..';
import {LanguageContext} from '../../../utils/context';

type WeekType = {weekType: string};

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
