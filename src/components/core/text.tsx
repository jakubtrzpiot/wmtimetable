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
      className={classNames('font-lexend-semibold', props?.className)}
      style={StyleSheet.flatten([
        setColor && {
          color: color,
        },
        props?.style,
      ])}>
      {props?.children}
    </Text>
  );
};

export default TextComponent;
