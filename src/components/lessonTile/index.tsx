import React, {useContext} from 'react';
import {KeyboardAvoidingView} from 'react-native';
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
  const {openCardId} = useContext(CardOpenContext);

  subject = subject as Subject;
  return (
    <KeyboardAvoidingView
      behavior="padding"
      className={`flex-row ${openCardId === i ? 'min-h-[70]' : 'h-[70]'}`}>
      <TimeModule {...time} />
      {subject ? (
        <>
          <SubjectModule i={i} {...subject} />
          <RoomModule room={subject.room} />
        </>
      ) : (
        <FreePeriod />
      )}
    </KeyboardAvoidingView>
  );
};

export default LessonTile;
