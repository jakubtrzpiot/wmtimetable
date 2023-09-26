import React from 'react';
import {View} from 'react-native';
import {TextComponent, ViewComponent} from '../core';
import {Subject} from '../../interfaces/timetable.interfaces';
import subjectMap from '../../utils/subjectMap';
import {TouchableHighlight} from 'react-native-gesture-handler';

const SubjectModule = ({name, teacher, type}: Subject) => {
  return (
    <TouchableHighlight className="grow">
      <ViewComponent className="grow rounded-3xl justify-between px-5 py-3 mr-2">
        <TextComponent className="w-56 text-base leading-5 !text-black tracking-wider">
          {subjectMap[name] ? subjectMap[name] : name}
        </TextComponent>
        <View className="flex-row justify-between">
          <TextComponent className="!text-black text-xs tracking-wide">
            {teacher}
          </TextComponent>
          <TextComponent className="!text-black leading-4 tracking-wide">
            {type}
          </TextComponent>
        </View>
      </ViewComponent>
    </TouchableHighlight>
  );
};

export default SubjectModule;
