import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {TextComponent, ViewComponent} from '../../core';
import {getDay} from '../../../utils/helpers';
import {DateContext, LanguageContext} from '../../../utils/context';

const DateCircle = ({date, i, days}: {date: Date; i: number; days: number}) => {
  const lang = useContext(LanguageContext);
  const en = lang === 'en';
  const day = getDay(date);
  const today = new Date().getTime();
  const dayLetter = date
    .toLocaleDateString(en ? 'en-us' : 'pl-pl', {
      weekday: 'long',
    })
    .slice(0, 1)
    .toUpperCase();
  const moreSpace = !(i === -days || i === days + 1) && day === 0;

  const {setDate} = useContext(DateContext);
  return (
    <TouchableOpacity
      onPress={() => setDate(date)}
      className={`pt-2 pb-1 justify-center items-center ${
        moreSpace ? 'ml-4' : ''
      } ${
        today - 1000 * 60 * 60 * 24 > date.getTime() && i ? 'opacity-[.35]' : ''
      }`}>
      <TextComponent className="mb-1">{dayLetter}</TextComponent>
      <ViewComponent
        className={`w-8 h-8 border-[1.25px] set-border rounded-full justify-center items-center ${
          !i ? '' : '!bg-[#121212]'
        }`}>
        <TextComponent className={`leading-4 ${!i ? '!text-[#121212]' : ''} `}>
          {date.getDate()}
        </TextComponent>
      </ViewComponent>
    </TouchableOpacity>
  );
};



export default DateCircle;
