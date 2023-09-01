import React from 'react';
import {View, Text} from 'react-native';
import {Period} from '../../types/timetable.types';

const Tile = ({start, end, subject, teacher, room}: Period) => {
  return (
    <View>
      <View>
        <Text className="text-white">{start}</Text>
        <Text className="text-white">{end}</Text>
      </View>
      <View>
        {subject ? <Text className="text-black">{subject}</Text> : null}
        {subject ? <Text className="text-black">{teacher}</Text> : null}
      </View>
      {subject ? <Text className="text-white">{room}</Text> : null}
    </View>
  );
};

export default Tile;
