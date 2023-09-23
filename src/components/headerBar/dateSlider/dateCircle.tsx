import React from 'react';
import {View} from 'react-native';
import {TextComponent, ViewComponent} from '../../../components';
import {getDay} from '../../../utils/helpers';

const DateCircle = ({date, i}: {date: Date; i: number}) => {
  const day = getDay(date);
  const today = new Date().getTime();
  const dayLetter = ['M', 'T', 'W', 'T', 'F', 'S', 'S'][day];
  const moreSpace = !(i === -14 || i === 14) && day === 0;

  return (
    <View
      className={`py-2 justify-center items-center ${moreSpace ? 'ml-4' : ''} ${
        today - 1000 * 60 * 60 * 24 > date.getTime() && i ? 'opacity-25' : ''
      }`}>
      <TextComponent className="mb-1">{dayLetter}</TextComponent>
      <ViewComponent
        className={`w-8 h-8 border-[1.25px] set-border rounded-full justify-center items-center ${
          !i ? '' : '!bg-black'
        }`}>
        <TextComponent className={`leading-4 ${!i ? '!text-black' : ''} `}>
          {date.getDate()}
        </TextComponent>
      </ViewComponent>
    </View>
  );
};

export default DateCircle;
