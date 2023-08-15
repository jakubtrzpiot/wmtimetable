import React from 'react';
import {Text} from 'react-native';
import parseTimetable from './src/api/parser';

const App: React.FC = () => {
  parseTimetable(3)
    .then(res => console.log(res))
    .catch(err => console.error(err.message));
  return <Text>React App</Text>;
};

export default App;
