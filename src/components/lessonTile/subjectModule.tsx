import React, {useContext, useState, useEffect} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import {IconComponent, TextComponent, ViewComponent} from '../core';
import {Subject} from '../../interfaces/timetable.interfaces';
import subjectMap from '../../utils/subjectMap';
import {
  LanguageContext,
  CardOpenContext,
  DateContext,
} from '../../utils/context';
import asyncStorage from '../../utils/asyncStorage';
import {Note, Notes} from '../../interfaces/notes.interfaces';

interface SubjectModuleProps extends Subject {
  i: number;
  notes?: string[];
}

const SubjectModule = ({name, teacher, type, i}: SubjectModuleProps) => {
  const {openCardId, setCardOpen} = useContext(CardOpenContext);
  const [note, setNote] = useState<string>('');
  const [notes, setNotes] = useState<Notes>([]);
  const [lines, setLines] = useState<number>(1);
  const {date} = useContext(DateContext);

  useEffect(() => {
    asyncStorage.getItem('notes').then(data => {
      setNotes(
        data.filter(
          (note: Note) =>
            note.date === date.toLocaleDateString() && note.lessonid === i,
        ),
      );
    });
  }, [date]);

  const addNote = (note: string) => {
    asyncStorage.getItem('notes').then(notes => {
      const newNotes = [
        ...notes,
        {lessonid: i, content: note, date: date.toLocaleDateString()},
      ];
      asyncStorage.setItem('notes', newNotes);
    });
    const newNotes = [
      ...notes,
      {lessonid: i, content: note, date: date.toLocaleDateString()},
    ];
    setNotes(newNotes);
  };

  const deleteNote = (idx: number) => {
    asyncStorage.getItem('notes').then(notes => {
      const newNotes = notes.filter(
        (item: Note) =>
          item.lessonid !== idx && item.date !== date.toLocaleDateString(),
      );
      asyncStorage.setItem('notes', newNotes);
    });
    const newNotes = notes.filter((item, index) => index !== idx);
    setNotes(newNotes);
  };

  const handleSubmitEditing = () => note && (addNote(note), setNote(''));

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
    openCardId === i ? setCardOpen(-1) : setCardOpen(i);
  };

  return (
    <TouchableOpacity
      className="flex-row flex-1 mr-2"
      activeOpacity={0.75}
      onPress={() => handleCardOpen()}>
      <ViewComponent className={`flex-1 rounded-3xl justify-between pt-4`}>
        <View className="flex-1 justify-between px-4 pb-4">
          <View className="flex-row">
            <TextComponent
              onTextLayout={e => setLines(e.nativeEvent.lines.length)}
              numberOfLines={i === openCardId ? lines : 1}
              className="flex-1 text-base leading-5 !text-[#121212] tracking-wider pb-[7]">
              {subjectMap[name] ? subjectMap[name] : name}
            </TextComponent>
          </View>
          <View className="flex-row justify-between">
            <TextComponent className="!text-[#121212] text-xs tracking-wide">
              {teacher.toUpperCase()}
            </TextComponent>
            <TextComponent className="!text-[#121212] leading-4 tracking-wide">
              {type}
            </TextComponent>
          </View>
        </View>
        {i === openCardId && (
          <TouchableOpacity activeOpacity={1} className="pl-4 pr-2">
            {notes?.length > 0 && (
              <TextComponent
                className={`!text-[#121212] text-sm tracking-wide pb-2`}>
                {en ? 'Notes:' : 'Notatki:'}
              </TextComponent>
            )}
            {notes?.map((note, idx) => (
              <View key={idx} className="flex-row">
                <TextComponent
                  className={`flex-1 !text-[#121212] text-xs tracking-wide pb-2`}>
                  {`${note.content}`}
                </TextComponent>
                <IconComponent
                  className="px-2"
                  name="close-thick"
                  size={14}
                  customColor="#121212"
                  onPress={() => deleteNote(idx)}
                />
              </View>
            ))}
            <TextInput
              className="!text-[#121212] text-xs tracking-wide font-lexend-semibold pb-1.5 pt-0 pl-0 pr-2"
              placeholder={en ? 'Add note' : 'Dodaj notatkę'}
              placeholderTextColor="#121212"
              value={note}
              onChangeText={text => setNote(text)}
              onSubmitEditing={() => handleSubmitEditing()}
              textAlignVertical="top"
            />
          </TouchableOpacity>
        )}
      </ViewComponent>
    </TouchableOpacity>
  );
};

export default SubjectModule;
