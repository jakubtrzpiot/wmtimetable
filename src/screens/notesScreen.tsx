import React, {useEffect, useState} from 'react';
import {View, Modal, ModalProps} from 'react-native';
import {Loader, ViewComponent, TextComponent} from '../components/core';
import asyncStorage from '../utils/asyncStorage';
import {FlatList} from 'react-native-gesture-handler';
import {Notes} from '../interfaces/notes.interfaces';

interface NotesScreenProps extends ModalProps {}

const NotesScreen = (props: NotesScreenProps) => {
  const [notes, setNotes] = useState<Notes>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    asyncStorage
      .getItem('notes')
      .then(data => (setNotes(data), setLoading(false)));
  }, []);

  <Modal
    animationType="slide"
    transparent={true}
    visible={props.visible}
    onRequestClose={props.onRequestClose}>
    {(!loading && (
      <View className="flex-1 justify-start px-4 bg-[#121212]">
        <FlatList
          data={notes}
          stickyHeaderIndices={[0]}
          renderItem={({item}) => (
            <ViewComponent className="flex-1 justify-start">
              <TextComponent className="text-white">
                {item.content}
              </TextComponent>
            </ViewComponent>
          )}
        />
      </View>
    )) || <Loader />}
  </Modal>;
};

export default NotesScreen;
