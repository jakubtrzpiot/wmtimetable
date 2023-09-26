import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {TextComponent} from '../../core';
import {addDays} from '../../../utils/helpers';
import {SetDateContext, LanguageContext} from '../../../utils/context';

const WeekDay = ({day}: {day: Date}) => {
  const lang = useContext(LanguageContext);
  const en = lang === 'en';
  const today = new Date();

  const toLocale = (date: Date) =>
    date.toLocaleDateString(en ? 'en-us' : 'pl-pl');

  let todayLocale = day.toLocaleDateString(en ? 'en-us' : 'pl-pl', {
    day: 'numeric',
    month: 'short',
  });

  const renderDay = () => {
    if (toLocale(day) === toLocale(today)) {
      return en ? 'TODAY' : 'DZISIAJ';
    } else if (toLocale(day) === toLocale(addDays(today, 1))) {
      return en ? 'TOMORROW' : 'JUTRO';
    } else if (toLocale(day) === toLocale(addDays(today, -1))) {
      return en ? 'YESTERDAY' : 'WCZORAJ';
    } else if (day > addDays(today, 1)) {
      return todayLocale.toUpperCase();
    } else if (day < addDays(today, -1)) {
      return todayLocale.toUpperCase();
    }
  };

  const handlePress = useContext(SetDateContext);

  return (
    <TouchableOpacity onPress={() => handlePress(today)}>
      <TextComponent className="text-3xl">{renderDay()}</TextComponent>
    </TouchableOpacity>
  );
};

export default WeekDay;
