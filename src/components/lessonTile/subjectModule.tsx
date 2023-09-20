import React from 'react';
import {View} from 'react-native';
import {TextComponent} from '../../components';
import {Subject} from '../../types/timetable.types';

const SubjectModule = ({name, teacher, type}: Subject) => {
  return (
    <View className="grow bg-white rounded-3xl justify-center px-4 mr-2">
      <TextComponent className="text-black text-lg">{name}</TextComponent>
      <View className="flex-row justify-between">
        <TextComponent className="text-black">{teacher}</TextComponent>
        <TextComponent className="text-black">{type}</TextComponent>
      </View>
    </View>
  );
};

export default SubjectModule;
