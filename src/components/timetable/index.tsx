import React from 'react';
import {ScrollView} from 'react-native';
import {TimetableTemplateProps} from '../../types/timetable.types';
import Tile from './tile';

export const TimetableTemplate = ({periods}: TimetableTemplateProps) => {
  return (
    <ScrollView>
      {periods?.map((period: any, idx: any) => (
        <Tile key={idx} {...period} />
      ))}
    </ScrollView>
  );
};

export default TimetableTemplate;
