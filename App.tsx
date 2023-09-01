import React from 'react';
import {View, Text} from 'react-native';

import TimetableScreen from './src/screens/timetableScreen';

const App: React.FC = () => {
  return (
    <View>
      <TimetableScreen />
      <Text>Test</Text>
    </View>
  );
};

export default App;
