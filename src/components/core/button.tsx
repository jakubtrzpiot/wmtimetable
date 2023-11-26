import React, {useContext} from 'react';
import {View, Pressable, PressableProps, StyleSheet} from 'react-native';
import TextComponent from './text';
import {ThemeContext} from '../../utils/context';

interface ButtonComponentProps extends PressableProps {
  text: string;
  small?: boolean;
  full?: boolean;
}

const ButtonComponent = (props: ButtonComponentProps) => {
  const color = useContext(ThemeContext);

  return (
    <View className={`items-center justify-center`}>
      <Pressable
        className={`items-center justify-center rounded-full ${
          props?.full && ' w-full'
        } ${props?.small ? 'px-4 py-2' : 'px-8 py-4'} ${props?.className}`}
        android_ripple={{color: '#12121296', borderless: false}}
        style={StyleSheet.flatten([{backgroundColor: color}, props?.style])}
        onPress={props?.onPress}
        onLongPress={props?.onLongPress}>
        <TextComponent
          style={{color: '#121212', fontFamily: 'Lexend-SemiBold'}}>
          {props?.text}
        </TextComponent>
      </Pressable>
    </View>
  );
};

export default ButtonComponent;
