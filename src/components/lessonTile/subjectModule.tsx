import React, {useContext, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {TextComponent, ViewComponent, IconComponent} from '../core';
import {Subject} from '../../interfaces/timetable.interfaces';
import subjectMap from '../../utils/subjectMap';
import {LanguageContext, CardOpenContext} from '../../utils/context';

interface SubjectModuleProps extends Subject {
  i: number;
}

const SubjectModule = ({name, teacher, type, i}: SubjectModuleProps) => {
  const {cardOpen, setCardOpen} = useContext(CardOpenContext);
  const [lines, setLines] = useState(1);

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
      type = en ? 'pc lab' : 'komputery';
      break;
    default:
  }

  type = type && type[0].toUpperCase() + type.slice(1);

  const handleCardOpen = () => {
    cardOpen[i] = !cardOpen[i];
    setCardOpen(cardOpen.map((item: boolean) => item));
  };

  return (
    <TouchableOpacity
      className="flex-row flex-1 mr-2"
      activeOpacity={0.75}
      onPress={() => handleCardOpen()}>
      <ViewComponent
        className={`flex-row flex-1 rounded-3xl justify-between ${
          cardOpen[i] ? 'pl-5' : 'px-5'
        }`}>
        <View className="flex-1 py-4">
          <View className="flex-row">
            <TextComponent
              onTextLayout={({nativeEvent}) =>
                setLines(nativeEvent.lines.length)
              }
              numberOfLines={cardOpen[i] ? 4 : 1}
              className="flex-1 text-base leading-5 !text-black tracking-wider pb-2">
              {subjectMap[name] ? subjectMap[name] : name}
            </TextComponent>
          </View>
          <View className="flex-row justify-between">
            <TextComponent className="!text-black text-xs tracking-wide">
              {teacher}
            </TextComponent>
            <TextComponent className="!text-black leading-4 tracking-wide">
              {type}
            </TextComponent>
          </View>
        </View>
        {cardOpen[i] && (
          <View className="h-full flex-row items-center">
            <IconComponent
              center
              activeOpacity={0.5}
              className="h-full px-4"
              name="note-edit"
              size={24}
              customColor="black"
            />
          </View>
        )}
      </ViewComponent>
    </TouchableOpacity>
  );
};

export default SubjectModule;
