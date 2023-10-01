import React, {useContext} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {ThemeContext} from '../../utils/context';

const PickerComponent = (props: any) => {
  const color = useContext(ThemeContext);
  return (
    <DropDownPicker
      theme="DARK"
      props={{
        style: {
          marginBottom: props.labeled ? 0 : 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 8,
          borderBottomWidth: 2,
          borderColor: color,
          backgroundColor: '#121212',
        },
      }}
      labelProps={{
        style: {
          color: color,
          fontFamily: 'Lexend-SemiBold',
        },
      }}
      containerStyle={{
        width: props.labeled ? '35%' : 'full',
      }}
      itemProps={{
        activeOpacity: 0.85,
        style: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 12,
          paddingRight: 6,
          backgroundColor: '#121212',
        },
      }}
      textStyle={{
        color: color,
        fontFamily: 'Lexend-SemiBold',
      }}
      {...props}
    />
  );
};

export default PickerComponent;
