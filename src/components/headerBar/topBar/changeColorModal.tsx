import React from 'react';
import {Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {View, FlatList} from 'react-native';
import {
  LabeledTextInputComponent,
  ButtonComponent,
  IconComponent,
} from '../../core';
import ColorTile from './colorTile';

interface ChangeColorModalProps {
  en: boolean;
  modalOpen: boolean;
  closeModal: () => void;
  colorHex: string;
  handleColorChange: (color: string) => void;
  userColor: string;
  setUserColor: (color: string) => void;
  randomizeColor: () => void;
}

const ChangeColorModal = (props: ChangeColorModalProps) => {
  const {
    en,
    modalOpen,
    closeModal,
    colorHex,
    handleColorChange,
    userColor,
    setUserColor,
    randomizeColor,
  } = props;

  const colors = [
    '#c5e1f5',
    ...[
      '#f5d0c5',
      '#f5c5d0',
      '#d0f5c5',
      '#c5f5d0',
      '#c5d0f5',
      '#d0c5f5',
      '#f5e1c5',
      '#f5c5e1',
      '#c5f5e1',
      '#e1f5c5',
      '#e1c5f5',
      '#f5c5c5',
      '#c5f5c5',
      '#c5c5f5',
      '#f5f5c5',
      '#f5c5f5',
      '#c5f5f5',
    ].sort(),
  ];

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalOpen}
      onRequestClose={() => closeModal()}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => closeModal()}
        className="flex-1 items-center justify-center bg-[#121212]/75">
        <TouchableWithoutFeedback>
          <View
            style={{borderColor: colorHex}}
            className={`w-3/4 pt-4 pl-6 pb-6 pr-4 bg-[#121212] border-2 rounded-[32px] flex-col`}>
            <FlatList
              className="py-2"
              data={colors}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item: color, index}) => (
                <ColorTile
                  key={index}
                  color={color}
                  selected={color === userColor}
                  onPress={() => setUserColor(color)}
                />
              )}
            />
            <View className="flex-row items-center justify-between pt-2 mb-4">
              <LabeledTextInputComponent
                label={en ? 'Enter color:' : 'Podaj kolor:'}
                onChangeText={text => setUserColor(text)}
                value={userColor}
                style={
                  /^#([0-9A-F]{3}){1,2}$/i.test(userColor)
                    ? {color: userColor, borderColor: userColor}
                    : {color: colorHex, borderColor: colorHex}
                }
                maxLength={7}
              />
              <IconComponent
                className="-mb-4 p-2"
                name="dice-multiple"
                size={32}
                onPress={() => randomizeColor()}
              />
            </View>
            <ButtonComponent
              className="mr-2"
              small
              full
              text={en ? 'Save' : 'Zapisz'}
              onPress={() => handleColorChange(userColor)}
            />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default ChangeColorModal;
