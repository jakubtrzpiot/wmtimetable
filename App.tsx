import React, {useEffect} from 'react';
import {View} from 'react-native';
import asyncStorage from './src/utils/asyncStorage';
import TimetableScreen from './src/screens/timetableScreen';

const App: React.FC = () => {
  //get day as a number starting from 0 and monday
  const getDay = (): number => {
    const date = new Date();
    const day = date.getDay();
    return day === 0 ? 6 : day - 1;
  };
  const dayNumber = getDay();

  //check if week is even or odd
  const getWeekType = (): string => {
    const date = new Date();
    const onejan = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((date.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) /
        7,
    );

    return weekNumber % 2 === 0 ? 'p' : 'n';
  };
  const weekType = getWeekType();

  useEffect(() => {
    asyncStorage.setItem('groups', ['l06', 'k05', 'p05', 'dg3', 'all']);
    asyncStorage.setItem('course', '22');
    asyncStorage.setItem('day', dayNumber.toString());
    asyncStorage.setItem('week', weekType);
  }, []);

  return (
    <View style={{flex: 1}}>
      <TimetableScreen />
    </View>
  );
};

export default App;
