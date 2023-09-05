import React from 'react';
import {ScrollView} from 'react-native';
import {Day} from '../../types/timetable.types';
import Tile from './tile';

export const TimetableTemplate = ({lessons}: Day) => {
  return (
    <ScrollView>
      {lessons?.map((lesson: any, idx: any) => (
        <Tile key={idx} {...lesson} />
      ))}
    </ScrollView>
  );
};

export default TimetableTemplate;
