import React, {useContext, useState, useEffect} from 'react';
import {Modal, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {View, FlatList, Alert, PlatformColor} from 'react-native';
import {
  LabeledTextInputComponent,
  ButtonComponent,
  IconComponent,
  SwitchComponent,
  LabeledComponent,
} from '../core';
import asyncStorage from '../../utils/asyncStorage';
import {
  LanguageContext,
  RefreshContext,
  ThemeContext,
} from '../../utils/context';
import ColorTile from '../headerBar/topBar/colorTile';

interface ChangeColorModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const ChangeColorModal = (props: ChangeColorModalProps) => {
  const {modalOpen, setModalOpen} = props;
  const lang = useContext(LanguageContext);
  const en = lang === 'en';

  const colorHex = useContext(ThemeContext);
  const [userColor, setUserColor] = useState<string>(colorHex);
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

  const [material, setMaterial] = useState(false);

  useEffect(() => {
    // console.log(PlatformColor('?android:attr/textColor'));
  });

  const useRefresh = useContext(RefreshContext);

  const getRgb = () => Math.floor(Math.random() * 256);

  const rgbToHex = (r: number, g: number, b: number) =>
    '#' +
    [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');

  const randomizeColor = () => {
    const color = {
      r: getRgb(),
      g: getRgb(),
      b: getRgb(),
    };

    const hex = rgbToHex(color.r, color.g, color.b);
    setUserColor(hex);
  };

  const handleColorChange = (hex: string) => {
    hex !== colorHex
      ? /^#([0-9A-F]{3}){1,2}$/i.test(hex)
        ? asyncStorage
            .setItem('color', hex)
            .then(() => (useRefresh('color'), setModalOpen(false)))
        : Alert.alert(
            en ? 'Invalid color' : 'Niepoprawny kolor',
            en
              ? 'Please enter a valid hex color'
              : 'Proszę podać poprawny kolor hex',
          )
      : setModalOpen(false);
  };

  const closeModal = () => (setModalOpen(false), setUserColor(colorHex));

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
            {/* add overlay to stop users from touching other options when material you colors are enabled */}
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
            <View className="flex-row items-center justify-between pt-2">
              <LabeledTextInputComponent
                label={en ? 'Enter color:' : 'Podaj kolor:'}
                onChangeText={text => setUserColor(text)}
                value={userColor.toUpperCase()}
                style={
                  /^#([0-9A-F]{3}){1,2}$/i.test(userColor)
                    ? {color: userColor, borderColor: userColor}
                    : {color: colorHex, borderColor: colorHex}
                }
                maxLength={7}
              />
              <IconComponent
                className="p-2"
                name="dice-multiple"
                size={32}
                onPress={() => randomizeColor()}
              />
            </View>

            <LabeledComponent label="MaterialYou" className="mb-4 -mt-2">
              <SwitchComponent
                value={material}
                left="Nie"
                right="Tak"
                onValueChange={() => setMaterial(material => !material)}
              />
            </LabeledComponent>
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
