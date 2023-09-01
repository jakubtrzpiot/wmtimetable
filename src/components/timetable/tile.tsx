import React from 'react';
import {View, Text} from 'react-native';
import {Period} from '../../types/timetable.types';

const Tile = ({time, subject}: Period) => {
  return (
    <View>
      <View>
        <Text className="text-white">{time.start}</Text>
        <Text className="text-white">{time.end}</Text>
      </View>
      <View>
        {subject?.name ? (
          <Text className="text-black">{subject.name}</Text>
        ) : null}
        {subject?.teacher ? (
          <Text className="text-black">{subject.teacher}</Text>
        ) : null}
      </View>
      {subject?.room ? (
        <Text className="text-white">{subject.room}</Text>
      ) : null}
    </View>
  );
};

export default Tile;
