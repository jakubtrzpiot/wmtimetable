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
        },
      }}
      dropDownContainerStyle={{
        backgroundColor: '#121212',
        color: color,
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
        },
      }}
      textStyle={{
        color: color,
        fontFamily: 'Lexend-SemiBold',
      }}
      searchContainerStyle={{
        borderBottomWidth: 0,
        padding: 0,
      }}
      searchTextInputProps={{
        maxLength: 4,
        cursorColor: color,
        placeholderTextColor: color,
        style: {
          width: '100%',
          color: color,
          fontFamily: 'Lexend-SemiBold',
          paddingVertical: 6,
          paddingHorizontal: 0,
        },
      }}
      {...props}
    />
  );
};

export default PickerComponent;
