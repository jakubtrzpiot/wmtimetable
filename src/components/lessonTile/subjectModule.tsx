import React, {useContext} from 'react';
import {View} from 'react-native';
import {TextComponent, ViewComponent} from '../core';
import {Subject} from '../../interfaces/timetable.interfaces';
import subjectMap from '../../utils/subjectMap';
import {LanguageContext} from '../../utils/context';

const SubjectModule = ({name, teacher, type}: Subject) => {
  const lang = useContext(LanguageContext);
  const en = lang === 'en';
  switch (type) {
    case 'j':
      type = en ? 'english' : 'język obcy';
      break;
    case 'w':
      type = en ? 'lecture' : 'wykład';
      break;
    case 'ć':
      type = en ? 'practical' : 'ćwiczenia';
      break;
    case 'l':
      type = en ? 'lab' : 'laboratorium';
      break;
    case 's':
      type = en ? 'seminar' : 'seminarium';
      break;
    case 'p':
      type = en ? 'project' : 'projekt';
      break;
    case 'k':
      type = en ? 'computer lab' : 'pracownia komputerowa';
      break;
    default:
  }
  type = type[0].toUpperCase() + type.slice(1);
  return (
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
  );
};

export default SubjectModule;
