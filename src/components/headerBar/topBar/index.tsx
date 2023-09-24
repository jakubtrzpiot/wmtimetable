import React, {useContext} from 'react';
import {View} from 'react-native';
import WeekDay from './weekDay';
import WeekType from './weekType';
import {IconComponent} from '../../../components';
import asyncStorage from '../../../utils/asyncStorage';
import {RefreshContext} from '../../../utils/context';

type TopBarProps = {week: string; date: Date};

const TopBar: React.FC<TopBarProps> = ({week, date}: TopBarProps) => {
  const useRefresh = useContext(RefreshContext);

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

  return (
    <View className="flex-row justify-between items-center">
      <View className="px-4 pb-2">
        <WeekDay day={date} />
        <WeekType weekType={week} />
      </View>
      <View className="flex-row">
        <IconComponent
          className="px-4 py-2"
          name="droplet"
          size={24}
          onPress={() => handleColorChange()}
        />
        <IconComponent
          className="px-4 py-2"
          name="calendar"
          size={24}
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
