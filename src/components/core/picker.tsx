import React, {useContext} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {LanguageContext, ThemeContext} from '../../utils/context';

const PickerComponent = (props: any) => {
  const color = useContext(ThemeContext);
  const en = useContext(LanguageContext) === 'en';
  return (
    <DropDownPicker
      theme="DARK"
      props={{
        style: {
          marginBottom: 32,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 12,
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
      itemProps={{
        activeOpacity: 0.8,
        style: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 12,
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
