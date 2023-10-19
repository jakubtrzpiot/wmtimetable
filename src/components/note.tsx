import React, {useState, useContext} from 'react';
import {TextComponent, ViewComponent} from './core';
import {Note} from '../interfaces/notes.interfaces';
import {TouchableOpacity, NativeSyntheticEvent} from 'react-native';
import {CardOpenContext, DateContext} from '../utils/context';

const NoteCard = ({item, i, close}: {item: Note; i: number; close: any}) => {
  const [lines, setLines] = useState<number>(1);
  const {setDate} = useContext(DateContext);
  const {setCardOpen} = useContext(CardOpenContext);

  const rounded = ['rounded-[20px]', 'rounded-[24px]'];

  const handlePick = () => {
    setDate(new Date(item.date));
    close(true);
    setCardOpen(item.lessonid);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => handlePick()}
      className={`flex-row flex-1 items-center`}>
      <ViewComponent
        className={`flex-1 justify-start p-4 ${
          rounded[lines - 1] ?? 'rounded-3xl'
        }`}>
        <TextComponent
          onTextLayout={e => setLines(e.nativeEvent.lines.length)}
          className="!text-[#121212]">
          {item.content}
        </TextComponent>
      </ViewComponent>
    </TouchableOpacity>
  );
};

export default NoteCard;
