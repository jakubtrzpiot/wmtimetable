import React, {useContext} from 'react';
import {View, ViewProps, StyleSheet} from 'react-native';
import classNames from 'classnames';
import {ThemeContext} from '../../utils/context';

const ViewComponent = (props: ViewProps) => {
  const color = useContext(ThemeContext);
  const setColor = props?.className?.search('!bg') === -1 ? true : false;
  const setBorder =
    props?.className?.search('set-border') !== -1 ? true : false;

  return (
    <View
      className={classNames(props?.className)}
      style={StyleSheet.flatten([
        setColor && {
          backgroundColor: color,
        },
        setBorder && {
          borderColor: color,
        },
      ])}>
      {props?.children}
    </View>
  );
};

export default ViewComponent;
