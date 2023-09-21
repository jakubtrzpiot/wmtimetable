import React from 'react';
import {TextComponent} from '../../components';

type DayNumber = {dayNumber: number};

const WeekDay = ({dayNumber}: DayNumber) => {
  const day = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ][dayNumber];

  return (
    <TextComponent className="text-2xl">{day.toUpperCase()}</TextComponent>
  );
};

export default WeekDay;
