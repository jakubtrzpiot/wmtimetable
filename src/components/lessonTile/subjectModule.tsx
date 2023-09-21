import React from 'react';
import {View} from 'react-native';
import {TextComponent} from '../../components';
import {Subject} from '../../types/timetable.types';
import subjectMap from '../../utils/subjectMap';

const SubjectModule = ({name, teacher, type}: Subject) => {
  return (
    <View className="w-[280] bg-slate-300 rounded-3xl justify-between px-5 mr-2 py-2.5">
      <TextComponent className="text-black text-lg leading-5">
        {subjectMap[name] ? subjectMap[name] : name}
      </TextComponent>
      <View className="flex-row justify-between">
        <TextComponent className="text-black text-xs leading-4">
          {teacher}
        </TextComponent>
        <TextComponent className="text-black leading-4">{type}</TextComponent>
      </View>
    </View>
  );
};

export default SubjectModule;
