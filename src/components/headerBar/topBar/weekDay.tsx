import React from 'react';
import {TextComponent} from '../..';
import {addDays} from '../../../utils/helpers';

const WeekDay = ({day}: {day: Date}) => {
  const today = new Date();

  const toLocale = (date: Date) => date.toLocaleDateString();
  const getOffset = (today: Date, day: Date) => {
    const offset = Math.round(
      Math.abs(today.getTime() - day.getTime()) / 1000 / 60 / 60 / 24,
    );
    let phrase = 'DAYS';
    if (!(offset % 7)) {
      offset === 7 ? (phrase = 'WEEK') : (phrase = 'WEEKS');
      return `${offset / 7} ${phrase}`;
    }
    return `${offset} ${phrase}`;
  };

  const renderDay = () => {
    if (toLocale(day) === toLocale(today)) {
      return 'TODAY';
    } else if (toLocale(day) === toLocale(addDays(today, 1))) {
      return 'TOMORROW';
    } else if (toLocale(day) === toLocale(addDays(today, -1))) {
      return 'YESTERDAY';
    } else if (day > addDays(today, 1)) {
      return `${getOffset(today, day)} LATER`;
    } else if (day < addDays(today, -1)) {
      return `${getOffset(today, day)} AGO`;
    }
  };

  return <TextComponent className="text-3xl">{renderDay()}</TextComponent>;
};

export default WeekDay;
