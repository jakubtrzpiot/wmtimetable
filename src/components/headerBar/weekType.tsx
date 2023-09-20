import React from 'react';
import {TextComponent} from '../../components';

type WeekType = {weekType: string};

const WeekType = ({weekType}: WeekType) => (
  <TextComponent className="">
    Tydzień {weekType === 'p' ? 'parzysty' : 'nieparzysty'}
  </TextComponent>
);

export default WeekType;
