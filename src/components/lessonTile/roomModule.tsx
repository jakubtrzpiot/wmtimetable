import React from 'react';
import {View} from 'react-native';
import {TextComponent} from '../../components';

type Room = {room: string};

const RoomModule = ({room}: Room) => {
  return (
    <View className="justify-center w-[10]">
      {[...room].map((letter, index) => (
        <TextComponent
          key={index}
          className={`${
            room === 'ONLINE' ? 'text-xs leading-3' : 'text-lg leading-5'
          } text-center`}>
          {letter}
        </TextComponent>
      ))}
    </View>
  );
};

export default RoomModule;