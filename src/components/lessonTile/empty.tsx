import React, {useContext} from 'react';
import {View} from 'react-native';
import {TextComponent} from '../core';
import {LanguageContext} from '../../utils/context';

const Empty = () => {
  const lang = useContext(LanguageContext);
  return (
    <View className="flex-1 items-center justify-center">
      <TextComponent className="text-base">
        {lang === 'en' ? 'No lessons' : 'Brak lekcji'}
      </TextComponent>
    </View>
  );
};

export default Empty;
