import React from 'react';
import {View, TextInputProps} from 'react-native';
import classNames from 'classnames';
import TextComponent from './text';
import TextInputComponent from './textInput';

interface LabeledComponentProps extends TextInputProps {
  label: string;
  underline?: boolean;
  children: React.ReactNode;
}

export const LabeledComponent = (props: LabeledComponentProps) => (
  <View
    className={classNames(
      'flex-row items-center justify-between',
      props?.className,
    )}>
    <TextComponent>{props?.label}</TextComponent>
    {props?.children}
  </View>
);

interface LabeledTextInputComponentProps extends TextInputProps {
  underline?: boolean;
  label: string;
}

export const LabeledTextInputComponent = (
  props: LabeledTextInputComponentProps,
) => {
  return (
    <View
      className={classNames(
        'flex-row items-center justify-between',
        props?.className,
      )}>
      <TextComponent>{props?.label}</TextComponent>
      <TextInputComponent {...props} />
    </View>
  );
};
