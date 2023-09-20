import React from 'react';
import {TextComponent} from '../../components';

type DayNumber = {dayNumber: number};

const WeekDay = ({dayNumber}: DayNumber) => {
  const day = [
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
    'Niedziela',
  ][dayNumber];

  return (
    <TextComponent className="text-2xl">{day.toUpperCase()}</TextComponent>
  );
};

export default WeekDay;
