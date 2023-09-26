import React from 'react';
import {Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {View} from 'react-native';
import {
  LabeledTextInputComponent,
  ButtonComponent,
  IconComponent,
} from '../../core';

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

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalOpen}
      onRequestClose={() => closeModal()}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => closeModal()}
        className="flex-1 items-center justify-center bg-[#121212]/80">
        <TouchableWithoutFeedback>
          <View
            style={{borderColor: colorHex}}
            className={`w-3/4 pt-4 pl-6 pb-6 pr-4 bg-[#121212] border-2 rounded-[32px] flex-col `}>
            <View className="flex-row items-center justify-between mb-6">
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
