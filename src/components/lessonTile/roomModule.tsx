import React from 'react';
import {View} from 'react-native';
import {TextComponent} from '../../components';

type Room = {room: string};

const RoomModule = ({room}: Room) => {
  return (
    <View className="justify-center">
      {[...room].map((letter, index) => (
        <TextComponent key={index} className="text-lg leading-5 text-center">
          {letter}
        </TextComponent>
      ))}
    </View>
  );
};

export default RoomModule;
