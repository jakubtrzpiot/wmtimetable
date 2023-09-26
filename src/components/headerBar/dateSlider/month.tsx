import React, {useContext} from 'react';
import {addDays} from '../../../utils/helpers';
import {View} from 'react-native';
import {TextComponent} from '../../core';
import {LanguageContext} from '../../../utils/context';

const Month = ({date}: {date: Date}) => {
  const lang = useContext(LanguageContext);
  const en = lang === 'en';

  const month = date
    .toLocaleString(en ? 'en-us' : 'pl-pl', {month: 'long'})
    .toLowerCase();
  const year = date.getFullYear().toString().slice(-2);

  const today = new Date();
  const day = date;

  const getOffset = (today: Date, day: Date) => {
    const offset = Math.round(
      Math.abs(today.getTime() - day.getTime()) / 1000 / 60 / 60 / 24,
    );
    if (!offset && offset === 1) return false;

    if (!(offset % (4 * 7))) {
      return `${
        Math.round(offset / (4 * 7)) === 1 ? '' : Math.round(offset / (4 * 7))
      } ${
        offset / (4 * 7) === 1
          ? en
            ? 'month'
            : 'miesiąc'
          : en
          ? 'months'
          : offset / (4 * 7) <= 4
          ? 'miesiące'
          : 'miesięcy'
      }`;
    }
    if (!(offset % 7)) {
      return `${Math.round(offset / 7) === 1 ? '' : Math.round(offset / 7)} ${
        offset / 7 === 1
          ? en
            ? 'week'
            : 'tydzień'
          : en
          ? 'weeks'
          : offset / 7 <= 4
          ? 'tygodnie'
          : 'tygodni'
      }`;
    }
    return `${offset} ${en ? 'days' : 'dni'}`;
  };

  const renderDay = () => {
    if (day > addDays(today, 1)) {
      return `${en ? 'IN' : 'ZA'} ${getOffset(today, day)}`;
    } else if (day < addDays(today, -2)) {
      return `${getOffset(today, day)} ${en ? 'ago' : 'temu'}`;
    }
  };

  return (
    <View className="flex-row justify-between">
      <TextComponent className="px-4">{`${month} '${year}`}</TextComponent>
      <TextComponent className="px-4">
        {renderDay()?.toLowerCase()}
      </TextComponent>
    </View>
  );
};

export default Month;
