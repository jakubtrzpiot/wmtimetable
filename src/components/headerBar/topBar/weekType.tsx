import React from 'react';
import {TextComponent} from '../..';

type WeekType = {weekType: string};

const WeekType = ({weekType}: WeekType) => (
  <TextComponent className="ml-1">
    {(weekType === 'p' ? 'even' : 'odd').toUpperCase()}
  </TextComponent>
);

export default WeekType;
