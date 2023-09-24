import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Modal,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import WeekDay from './weekDay';
import WeekType from './weekType';
import {
  IconComponent,
  TextComponent,
  TextInputComponent,
} from '../../../components';
import asyncStorage from '../../../utils/asyncStorage';
import {
  LanguageContext,
  RefreshContext,
  ThemeContext,
} from '../../../utils/context';

type TopBarProps = {week: string; date: Date};

const TopBar: React.FC<TopBarProps> = ({week, date}: TopBarProps) => {
  const [courseName, setCourseName] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const useRefresh = useContext(RefreshContext);
  const colorHex = useContext(ThemeContext);
  const lang = useContext(LanguageContext);
  const en = lang === 'en';
  const [userColor, setUserColor] = useState<string>('');

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

  const handleColorChange = () => {
    const color = {
      r: getRgb(),
      g: getRgb(),
      b: getRgb(),
    };

    const hex = rgbToHex(color.r, color.g, color.b);
    console.log('color', hex);
    asyncStorage.setItem('color', hex).then(() => useRefresh('color'));
  };

  const handleColorSet = (hex: string) => {
    console.log('color', hex);
    /^#([0-9A-F]{3}){1,2}$/i.test(hex)
      ? asyncStorage
          .setItem('color', hex)
          .then(() => (useRefresh('color'), setModalOpen(false)))
      : Alert.alert(
          en ? 'Invalid color' : 'Niepoprawny kolor',
          en
            ? 'Please enter a valid hex color'
            : 'Proszę podać poprawny kolor hex',
        );
  };

  return (
    <View className="flex-row justify-between items-center">
      <View className="px-4 pb-2">
        <WeekDay day={date} />
        <WeekType weekType={week} />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalOpen(false)}
          className="flex-1 items-center justify-center bg-[#121212]/80">
          <TouchableWithoutFeedback>
            <View
              style={{borderColor: colorHex}}
              className={`py-6 px-12 bg-[#121212] border-2 rounded-3xl flex-col justify-between items-center`}>
              <View className="flex-row items-center mb-8">
                <TextComponent className="pr-4">
                  {en ? 'Hex color: ' : 'Kolor hex: '}
                </TextComponent>
                <TextInputComponent
                  onChangeText={text => setUserColor(text)}
                  className="font-lexend-semibold m-0 py-1 px-2 border-b-[1.25px] text-center w-1/3"
                  maxLength={7}
                />
              </View>
              <TouchableOpacity
                className="py-4 px-8 items-center rounded-2xl self-center"
                onPress={() => handleColorSet(userColor)}>
                <TextComponent>{en ? 'Save' : 'Zapisz'}</TextComponent>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      <View className="flex-row">
        <IconComponent
          className="px-4 py-2"
          name="droplet"
          size={24}
          label={colorHex}
          onPress={() => handleColorChange()}
          onLongPress={() => (setModalOpen(true), console.log('long press'))}
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
