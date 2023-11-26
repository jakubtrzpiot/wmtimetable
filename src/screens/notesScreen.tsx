import React, {useContext} from 'react';
import {View, Modal, ModalProps, SectionList} from 'react-native';
import {TextComponent, IconComponent, Loader} from '../components/core';
import {FlatList} from 'react-native-gesture-handler';
import {NotesContext} from '../utils/context';
import NoteCard from '../components/note';

interface NotesScreenProps extends ModalProps {}

const NotesScreen = (props: NotesScreenProps) => {
  const {notes} = useContext(NotesContext);

  const toLocale = (date: Date) => {
    return date.toLocaleDateString('pl-PL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}>
      <View className="flex-1 justify-start bg-[#121212]">
        <View className="flex-row justify-between items-center">
          <TextComponent className="px-4 text-3xl">NOTATKI</TextComponent>
          <IconComponent
            className="px-4"
            center
            name="close"
            size={30}
            onPress={props.onRequestClose}
          />
        </View>
        {notes.length ? (
          <FlatList
            className="px-4 pt-4"
            data={notes.sort((a, b) => a.date.getTime() - b.date.getTime())}
            renderItem={({item, index}) => {
              const same =
                index === 0 ||
                item.date.toLocaleDateString() !==
                  notes[index - 1].date.toLocaleDateString();
              return (
                <>
                  {same && (
                    <TextComponent
                      className={`mb-2 text-xl ${index !== 0 && 'mt-4'}`}>
                      {toLocale(item.date)}
                    </TextComponent>
                  )}
                  <NoteCard
                    i={index}
                    item={item}
                    close={props.onRequestClose}
                  />
                </>
              );
            }}
            ItemSeparatorComponent={() => <View className="h-4" />}
          />
        ) : (
          <View className="flex-1 items-center">
            <TextComponent className="text-lg mt-4">Brak notatek</TextComponent>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default NotesScreen;
