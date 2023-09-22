import React, {useEffect} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {setInitialValues, fetchTimetable} from './src/utils/helpers';
import TimetableScreen from './src/screens/timetableScreen';

const App: React.FC = () => {
  useEffect(() => {
    setInitialValues(22, ['l06', 'k05', 'p05', 'dg3', 'all']).then(() =>
      fetchTimetable(),
    );
  }, []);

  return (
    <GestureHandlerRootView className="flex-1 bg-black">
      <TimetableScreen />
    </GestureHandlerRootView>
  );
};

export default App;
