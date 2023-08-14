import React from 'react';
import {Text} from 'react-native';
import parseTimetable from './src/api/parser';

const App: React.FC = () => {
  parseTimetable('o3')
    .then(timetable => console.log(timetable))
    .catch(err => console.log(err.message));
  return <Text>React App</Text>;
};

export default App;
