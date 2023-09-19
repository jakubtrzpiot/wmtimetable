import React, {useEffect} from 'react';
import {View} from 'react-native';
import {setInitialValues, setTimetable} from './src/utils/helpers';
import TimetableScreen from './src/screens/timetableScreen';

const App: React.FC = () => {
  useEffect(() => {
    setInitialValues(22, ['l06', 'k05', 'p05', 'dg3', 'all']);
    setTimetable();
  }, []);

  return (
    <View style={{flex: 1}}>
      <TimetableScreen />
    </View>
  );
};

export default App;
