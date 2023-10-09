import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {TextComponent, ViewComponent} from '../core';
import {Subject} from '../../interfaces/timetable.interfaces';
import subjectMap from '../../utils/subjectMap';
import {LanguageContext, CardOpenContext} from '../../utils/context';

interface SubjectModuleProps extends Subject {
  i: number;
}

const SubjectModule = ({name, teacher, type, i}: SubjectModuleProps) => {
  const {cardOpen, setCardOpen} = useContext(CardOpenContext);

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

  type = type && type[0].toUpperCase() + type.slice(1);

  const handleCardOpen = () => {
    cardOpen[i] = !cardOpen[i];
    setCardOpen(cardOpen.map((item: boolean) => item));
  };

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={() => handleCardOpen()}>
      <ViewComponent className="grow rounded-3xl justify-between px-5 py-4 mr-2">
        <TextComponent
          numberOfLines={cardOpen[i] ? 4 : 1}
          className="w-56 text-base leading-5 !text-black tracking-wider pb-2">
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
    </TouchableOpacity>
  );
};

export default SubjectModule;
