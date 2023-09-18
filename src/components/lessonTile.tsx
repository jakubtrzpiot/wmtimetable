import React from 'react';
import {View, Text} from 'react-native';
import {Lesson, Subject} from '../types/timetable.types';

const LessonTile = ({time, subject}: Lesson) => {
  const {start, end} = time;
  const {name, type, group, week, teacher, room} = subject;
  return (
    <View>
      <View>
        <Text className="text-black dark:text-white">{start}</Text>
        <Text className="text-black dark:text-white">{end}</Text>
      </View>
      <View>
        {subject ? (
          <Text className="text-white dark:text-black">{name}</Text>
        ) : null}
        {subject ? (
          <Text className="text-white dark:text-black">{teacher}</Text>
        ) : null}
      </View>
      {subject ? (
        <Text className="text-black dark:text-white">{room}</Text>
      ) : null}
    </View>
  );
};

export default LessonTile;
