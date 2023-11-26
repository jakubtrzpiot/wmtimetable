import React from 'react';
import {TouchableOpacity} from 'react-native';

interface ColorTileProps {
  color: string;
  selected: boolean;
  onPress: (color: string) => void;
}

const ColorTile = ({color, selected, onPress}: ColorTileProps) => (
  <TouchableOpacity
    className={`w-8 h-8 rounded-xl mr-2 ${
      selected ? 'border-2 border-white ' : 'opacity-80'
    }`}
    style={{backgroundColor: color}}
    onPress={() => onPress(color)}
  />
);

export default ColorTile;
