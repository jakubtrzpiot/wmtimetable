import React from 'react';
import {TextComponent} from '../../../components';

const Month = ({date}: {date: Date}) => {
  const month = date.toLocaleString('default', {month: 'long'}).toLowerCase();
  return <TextComponent className="px-4">{month}</TextComponent>;
};

export default Month;
