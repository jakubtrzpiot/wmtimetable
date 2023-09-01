import React from 'react';
import {View, Text} from 'react-native';

import TimetableScreen from './src/screens/timetableScreen';

const App: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <TimetableScreen />
    </View>
  );
};

export default App;
