import React, {useState, useContext} from 'react';
import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {TextInputProps} from 'react-native/Libraries/Components/TextInput/TextInput';
import {ThemeContext} from '../utils/context';

type TextComponentProps = {
  className?: string;
  children: React.ReactNode;
};

export const TextComponent = ({className, children}: TextComponentProps) => {
  const color = useContext(ThemeContext);

  return (
    <Text
      className={`font-lexend-semibold ${className}`}
      style={
        !className || className?.search('!text') === -1 ? {color: color} : null
      }>
      {children}
    </Text>
  );
};

export const TextInputComponent = (props: TextInputProps) => {
  const color = useContext(ThemeContext);

  const {className} = props;
  return (
    <TextInput
      className={`font-lexend-semibold py-1 px-4 border-b-[1.25px] ml-4 text-center ${className}`}
      style={{
        color: color,
        borderColor: color,
      }}
      {...props}
    />
  );
};

type ViewComponentProps = {
  className?: string;
  children?: React.ReactNode;
};

export const ViewComponent = (
  {className, children}: ViewComponentProps,
  props: any,
) => {
  const color = useContext(ThemeContext);

  let style: {backgroundColor?: string; borderColor?: string} = {};
  if (className?.search('!bg') === -1) {
    style.backgroundColor = color;
  }
  if (className?.search('set-border') !== -1) {
    style.borderColor = color;
  }

  return (
    <View style={style} className={`${className}`} {...props}>
      {children}
    </View>
  );
};

type SettingsIconProps = {
  onPress?: () => void;
  onLongPress?: () => void;
  name: string;
  size?: number;
  label?: string;
  customColor?: string;
  className?: string;
};

export const IconComponent = ({
  onPress,
  onLongPress,
  name,
  size,
  label,
  customColor,
  className,
}: SettingsIconProps) => {
  const color = useContext(ThemeContext);

  return (
    <TouchableOpacity
      className={className}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View className="flex-col items-center">
        <Icon
          name={name}
          size={size}
          color={customColor ? customColor : color}
        />
        <TextComponent className="leading-3 -mt-1">{label}</TextComponent>
      </View>
    </TouchableOpacity>
  );
};

export const SwitchComponent = ({
  value,
  left,
  right,
  onValueChange,
}: {
  value: boolean;
  left: string;
  right: string;
  onValueChange: () => void;
}) => {
  const color = useContext(ThemeContext);

  return (
    <View className="flex-row items-center">
      <TextComponent>
        <Text>{left}</Text>
      </TextComponent>
      <View className="px-4 py-4 -mb-5">
        <IconComponent
          name={value ? 'toggle-right' : 'toggle-left'}
          size={30}
          customColor={value ? color : color}
          onPress={onValueChange}
        />
      </View>
      <TextComponent>{right}</TextComponent>
    </View>
  );
};

import {PanGestureHandler, State} from 'react-native-gesture-handler';
import type {PanGestureHandlerGestureEvent as Event} from 'react-native-gesture-handler';

type Dir = 'left' | 'right' | 'up' | 'down';

type SwipeComponentProps = {
  onSwipe?: (dir: Dir) => void;
  onPull?: () => void;
  onPush?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  children: React.ReactNode;
};

export const SwipeComponent = ({
  onSwipe,
  onPull,
  onPush,
  onSwipeLeft,
  onSwipeRight,
  children,
}: SwipeComponentProps) => {
  const [didFire, setDidFire] = useState<boolean>(false);
  const [dir, setDir] = useState<Dir>();
  const swipeRange: number = 50;

  const onGestureEvent = ({nativeEvent}: Event) => {
    const {translationX, translationY} = nativeEvent;

    if (translationX > swipeRange && !didFire) {
      setDir('right'), setDidFire(true);
      onSwipeRight ? onSwipeRight() : null;
    } else if (translationX < -swipeRange && !didFire) {
      setDir('left'), setDidFire(true);
      onSwipeLeft ? onSwipeLeft() : null;
    } else if (translationY > swipeRange && !didFire) {
      setDir('down'), setDidFire(true);
      onPull ? onPull() : null;
    } else if (translationY < -swipeRange && !didFire) {
      setDir('up'), setDidFire(true);
      onPush ? onPush() : null;
    }
  };

  const onHandlerStateChange = ({nativeEvent}: Event) => {
    nativeEvent.state === State.END
      ? dir
        ? (onSwipe && onSwipe(dir), setDidFire(false))
        : null
      : null;
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}>
      {children}
    </PanGestureHandler>
  );
};

export const Loader = () => {
  const color = useContext(ThemeContext);
  return (
    <View className="flex-1 justify-center items-center bg-inherit">
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};
