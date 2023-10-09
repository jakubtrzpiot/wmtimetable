import React, {useContext, useEffect, useState} from 'react';
import {View, Alert} from 'react-native';
import WeekDay from './weekDay';
import WeekType from './weekType';
import {IconComponent} from '../../core';
import asyncStorage from '../../../utils/asyncStorage';
import {
  LanguageContext,
  RefreshContext,
  ThemeContext,
} from '../../../utils/context';
import ChangeColorModal from './changeColorModal';

interface TopBarProps {
  week: string;
  date: Date;
}

const TopBar: React.FC<TopBarProps> = ({week, date}: TopBarProps) => {
  const [courseName, setCourseName] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const useRefresh = useContext(RefreshContext);
  const colorHex = useContext(ThemeContext);
  const lang = useContext(LanguageContext);
  const en = lang === 'en';
  const [userColor, setUserColor] = useState<string>(colorHex);

  useEffect(() => {
    asyncStorage
      .getItem('courseName')
      .then(data => data && setCourseName(data));
  }, []);

  const handlePlanChange = () => {
    useRefresh('setup');
  };

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
    <View className="flex-row justify-between items-center">
      <View className="px-4 pb-2">
        <WeekDay />
        <WeekType weekType={week} />
      </View>

      <ChangeColorModal
        en={en}
        modalOpen={modalOpen}
        closeModal={closeModal}
        colorHex={colorHex}
        handleColorChange={handleColorChange}
        userColor={userColor}
        setUserColor={setUserColor}
        randomizeColor={randomizeColor}
      />

      <View className="flex-row items-center justify-end">
        <IconComponent
          className="px-4 py-2"
          name="palette"
          size={24}
          label={colorHex.toLowerCase()}
          onPress={() => setModalOpen(true)}
        />
        <IconComponent
          className="px-4 py-2"
          name="calendar"
          size={24}
          label={courseName}
          onPress={() => handlePlanChange()}
        />
        {/* <IconComponent
          className="px-4 py-2"
          name="sliders"
          size={24}
          onPress={() => handlePress()}
        /> */}
      </View>
    </View>
  );
};

export default TopBar;
