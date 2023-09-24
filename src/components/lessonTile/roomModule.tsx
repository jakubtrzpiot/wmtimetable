import React from 'react';
import {View} from 'react-native';
import {TextComponent} from '../../components';

type Room = {room: string};

const RoomModule = ({room}: Room) => {
  return (
    <View className="justify-center w-[12]">
      {[...room].map((letter, index) => (
        <TextComponent
          key={index}
          className={`${
            room.length >= 6 ? 'text-xs leading-[13px]' : room.length>=5 ? 'text-base leading-4' :'text-lg leading-5'
          } text-center`}>
          {letter}
        </TextComponent>
      ))}
    </View>
  );
};

export default RoomModule;
