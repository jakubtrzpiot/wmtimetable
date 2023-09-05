import React from 'react';
import {View, Text} from 'react-native';
import {Lesson} from '../../types/timetable.types';

const Tile = ({start, end, subject, teacher, room}: Lesson) => {
  return (
    <View>
      <View>
        <Text className="text-black dark:text-white">{start}</Text>
        <Text className="text-black dark:text-white">{end}</Text>
      </View>
      <View>
        {subject ? (
          <Text className="text-white dark:text-black">{subject}</Text>
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

export default Tile;
