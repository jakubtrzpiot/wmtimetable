import React, {useState, useContext, useEffect} from 'react';
import {
  IconComponent,
  TextComponent,
  ViewComponent,
  ButtonComponent,
} from './core';
import {Note} from '../interfaces/notes.interfaces';
import {
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  CardOpenContext,
  DateContext,
  NotesContext,
  ThemeContext,
} from '../utils/context';

const NoteCard = ({item, close}: {item: Note; i: number; close: any}) => {
  const [lines, setLines] = useState<number>(1);
  const {setDate} = useContext(DateContext);
  // const {setCardOpen} = useContext(CardOpenContext);
  const {removeNote} = useContext(NotesContext);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const colorHex = useContext(ThemeContext);

  const rounded = ['rounded-[20px]', 'rounded-[24px]'];

  const handlePick = () => {
    setDate(item.date);
    close(true);
    // setCardOpen(item.lessonid);
  };

  const onModalDismiss = (confirm: boolean) => {
    confirm && removeNote(item);
    setModalOpen(false);
  };

  const handleRemove = () => {
    setModalOpen(true);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => handlePick()}
      className={`flex-row flex-1 items-center`}>
      <ViewComponent
        className={`flex-1 flex-row justify-between items-center py-4 pl-4 ${
          rounded[lines - 1] ?? 'rounded-3xl'
        }`}>
        <TextComponent
          onTextLayout={e => setLines(e.nativeEvent.lines.length)}
          className="!text-[#121212]">
          {item.content}
        </TextComponent>
        <IconComponent
          name="close"
          className="-mt-2.5 -mb-4 px-4"
          customColor="#121212"
          center
          size={20}
          onPress={() => handleRemove()}
        />
        {/*move to modals*/}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalOpen}
          onRequestClose={() => setModalOpen(false)}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setModalOpen(false)}
            className="flex-1 items-center justify-center bg-[#121212]/75">
            <TouchableWithoutFeedback>
              <View
                style={{borderColor: colorHex}}
                className={`w-3/4 p-4 bg-[#121212] border-2 rounded-[32px] flex-col items-center`}>
                <TextComponent className="mb-8 text-base text-center">
                  Czy na pewno chcesz usunąć tę notatkę?
                </TextComponent>
                <View className="flex-row w-full justify-around pb-2">
                  <ButtonComponent
                    text={'Nie'}
                    onPress={() => onModalDismiss(false)}
                  />
                  <ButtonComponent
                    text={'Tak'}
                    onPress={() => onModalDismiss(true)}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </ViewComponent>
    </TouchableOpacity>
  );
};

export default NoteCard;
