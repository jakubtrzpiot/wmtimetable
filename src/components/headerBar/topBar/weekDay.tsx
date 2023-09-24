import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {TextComponent} from '../..';
import {addDays} from '../../../utils/helpers';
import {SetDateContext, LanguageContext} from '../../../utils/context';

const WeekDay = ({day}: {day: Date}) => {
  const lang = useContext(LanguageContext);
  const en = lang === 'en';
  const today = new Date();

  const toLocale = (date: Date) => date.toLocaleDateString();
  const getOffset = (today: Date, day: Date) => {
    const offset = Math.round(
      Math.abs(today.getTime() - day.getTime()) / 1000 / 60 / 60 / 24,
    );
    let phrase = en ? 'DAYS' : 'DNI';
    if (!(offset % 7)) {
      offset === 7
        ? (phrase = en ? 'WEEK' : 'TYDZIEŃ')
        : (phrase = en ? 'WEEKS' : 'TYGODNIE');
      return `${offset / 7} ${phrase}`;
    }
    return `${offset} ${phrase}`;
  };

  const renderDay = () => {
    if (toLocale(day) === toLocale(today)) {
      return en ? 'TODAY' : 'DZISIAJ';
    } else if (toLocale(day) === toLocale(addDays(today, 1))) {
      return en ? 'TOMORROW' : 'JUTRO';
    } else if (toLocale(day) === toLocale(addDays(today, -1))) {
      return en ? 'YESTERDAY' : 'WCZORAJ';
    } else if (day > addDays(today, 1)) {
      return `${en ? 'IN' : 'ZA'} ${getOffset(today, day)}`;
    } else if (day < addDays(today, -1)) {
      return `${getOffset(today, day)} ${en ? 'AGO' : 'TEMU'}`;
    }
  };

  const handlePress = useContext(SetDateContext);

  return (
    <TouchableOpacity
      onPress={() =>
        !(toLocale(today) === toLocale(day)) && handlePress(today)
      }>
      <TextComponent className="text-3xl">{renderDay()}</TextComponent>
    </TouchableOpacity>
  );
};

export default WeekDay;
