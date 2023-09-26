import React from 'react';
import {View} from 'react-native';
import {Lesson, Subject} from '../../interfaces/timetable.interfaces';
import TimeModule from './timeModule';
import SubjectModule from './subjectModule';
import RoomModule from './roomModule';

const LessonTile = ({time, subject}: Lesson) => {
  subject = subject as Subject;
  return (
    <View className="flex-row h-[78] ">
      <TimeModule {...time} />
      <SubjectModule {...subject} />
      <RoomModule room={subject.room} />
    </View>
  );
};

export default LessonTile;
