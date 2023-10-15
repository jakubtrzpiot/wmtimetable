import React, {useContext} from 'react';
import {
  View,
  Text,
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
  indicator?: number;
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
        props.center
          ? {paddingBottom: -props.size / 2, paddingTop: props.size / 2}
          : {},
      ])}>
      <View className="flex-col items-center justify-center">
        {props?.indicator && (
          <View
            className="absolute -top-1.5 -right-2 w-4 h-4 items-center justify-center rounded-full z-50"
            style={{backgroundColor: color}}>
            <Text className="font-lexend-semibold text-xs text-[#121212]">
              {props.indicator}
            </Text>
          </View>
        )}
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
