import React, {useContext} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TextComponent from './text';
import {ThemeContext} from '../../utils/context';
import classNames = require('classnames');

interface IconComponentProps extends TouchableOpacityProps {
  name: string;
  size: number;
  label?: string;
  customColor?: string;
  center?: boolean;
  disabled?: boolean;
  activeOpacity?: number;
}

const IconComponent = (props: IconComponentProps) => {
  const color = useContext(ThemeContext);

  return (
    <TouchableOpacity
      className={classNames(
        props?.className,
        'flex-row justify-center items-center',
      )}
      onPress={props?.onPress}
      onLongPress={props?.onLongPress}
      disabled={props?.disabled}
      activeOpacity={props?.activeOpacity}
      style={StyleSheet.flatten([
        props?.style,
        props.center ? {paddingTop: props.size / 2} : {},
      ])}>
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
