import React, {useContext} from 'react';
import {View} from 'react-native';
import {Lesson, Subject} from '../../interfaces/timetable.interfaces';
import TimeModule from './timeModule';
import SubjectModule from './subjectModule';
import RoomModule from './roomModule';
import {CardOpenContext} from '../../utils/context';
import FreePeriod from './freePeriod';

interface LessonTileProps extends Lesson {
  i: number;
}

const LessonTile = ({time, subject, i}: LessonTileProps) => {
  const {cardOpen} = useContext(CardOpenContext);

  subject = subject as Subject;
  return (
    <View className={`flex-row ${cardOpen[i] ? 'min-h-[72]' : 'h-[72]'}`}>
      <TimeModule {...time} />
      {subject ? (
        <>
          <SubjectModule i={i} {...subject} />
          <RoomModule room={subject.room} />
        </>
      ) : (
        <FreePeriod />
      )}
    </View>
  );
};

export default LessonTile;
