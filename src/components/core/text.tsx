import React, {useContext} from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';
import classNames from 'classnames';
import {ThemeContext} from '../../utils/context';

const TextComponent = (props: TextProps) => {
  const color = useContext(ThemeContext);
  const setColor =
    props?.className && props?.className?.search('!text') !== -1 ? false : true;

  return (
    <Text
      maxFontSizeMultiplier={1}
      className={props?.className}
      disabled={true}
      style={StyleSheet.flatten([
        setColor && {
          color: color,
        },
        {fontFamily: 'Lexend-SemiBold'},
        props?.style,
      ])}
      {...props}>
      {props?.children}
    </Text>
  );
};

export default TextComponent;
