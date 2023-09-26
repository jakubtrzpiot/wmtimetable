import React, {useContext} from 'react';
import {TextInput, TextInputProps, StyleSheet} from 'react-native';
import classNames from 'classnames';
import {ThemeContext} from '../../utils/context';

interface TextInputComponentProps extends TextInputProps {
  underline?: boolean;
}

const TextInputComponent = (props: TextInputComponentProps) => {
  const color = useContext(ThemeContext);
  const setColor =
    props?.className && props?.className?.search('!text') !== -1 ? false : true;

  return (
    <TextInput
      className={classNames(
        'font-lexend-semibold text-center px-4 py-0',
        props?.className && props?.className,
      )}
      placeholderTextColor={color}
      style={StyleSheet.flatten([
        setColor && {
          color: color,
        },
        props?.underline && {borderColor: color, borderBottomWidth: 2},
        props?.style,
      ])}
      placeholder={props?.placeholder}
      onChangeText={props?.onChangeText}
      value={props?.value}
      inputMode={props?.inputMode}
      maxLength={props?.maxLength}>
      {props?.children}
    </TextInput>
  );
};

export default TextInputComponent;
