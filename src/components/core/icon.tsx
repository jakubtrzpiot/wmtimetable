import React, {useContext} from 'react';
import {View, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextComponent from './text';
import {ThemeContext} from '../../utils/context';

interface IconComponentProps extends TouchableOpacityProps {
  name: string;
  size: number;
  label?: string;
  customColor?: string;
}

const IconComponent = (props: IconComponentProps) => {
  const color = useContext(ThemeContext);

  return (
    <TouchableOpacity
      className={props?.className}
      onPress={props?.onPress}
      onLongPress={props?.onLongPress}
      style={props?.style}>
      <View className="flex-col items-center justify-center">
        <Icon
          name={props?.name}
          size={props?.size}
          color={props?.customColor ? props?.customColor : color}
        />
        <TextComponent>{props?.label}</TextComponent>
      </View>
    </TouchableOpacity>
  );
};

export default IconComponent;
