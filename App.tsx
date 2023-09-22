import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {isInitialValuesSet} from './src/utils/helpers';
import TimetableScreen from './src/screens/timetableScreen';
import SetupScreen from './src/screens/setupScreen';

const App: React.FC = () => {
  const [initialValuesSet, setInitialValuesSet] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isInitialValuesSet().then(
      result => (setInitialValuesSet(result), setLoading(false)),
    );
  }, []);

  return !loading ? (
    (initialValuesSet && (
      <GestureHandlerRootView className="flex-1 bg-black">
        <TimetableScreen />
      </GestureHandlerRootView>
    )) || <SetupScreen />
  ) : (
    <View className="flex-1 bg-black justify-center items-center">
      <View className="mt-4 h-14"></View>
      <ActivityIndicator size="large" color="#daecff" />
    </View>
  );
};

export default App;
