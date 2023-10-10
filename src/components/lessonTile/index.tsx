import React, {useContext} from 'react';
import {View} from 'react-native';
import {IconComponent, TextComponent} from '../core';
import {Lesson, Subject} from '../../interfaces/timetable.interfaces';
import TimeModule from './timeModule';
import SubjectModule from './subjectModule';
import RoomModule from './roomModule';
import {CardOpenContext} from '../../utils/context';

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
        <View className="grow items-center mx-4 justify-start flex-row">
          <IconComponent className="mt-4" name="bomb" size={32} />
          <TextComponent className="text-lg ml-4 mr-3">
            Wycziluj bombe
          </TextComponent>
          <IconComponent className="mt-4" name="bomb" size={32} />
        </View>
      )}
    </View>
  );
};

export default LessonTile;
