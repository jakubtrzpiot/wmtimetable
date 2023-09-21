import React from 'react';
import {TextComponent} from '../../components';

type WeekType = {weekType: string};

const WeekType = ({weekType}: WeekType) => (
  <TextComponent className="">
    {(weekType === 'p' ? 'even' : 'odd').toUpperCase()}
  </TextComponent>
);

export default WeekType;
