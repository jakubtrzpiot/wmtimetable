import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {isInitialValuesSet} from './src/utils/helpers';
import TimetableScreen from './src/screens/timetableScreen';
import SetupScreen from './src/screens/setupScreen';
import {Loader} from './src/components';

const App: React.FC = () => {
  const [initialValuesSet, setInitialValuesSet] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    watchSubmit();
  }, [initialValuesSet]);

  const watchSubmit = () => {
    isInitialValuesSet().then(
      result => (setInitialValuesSet(result), setLoading(false)),
    );
  };

  return (
    <View className="flex-1 bg-[#121212]">
      {!loading ? (
        (initialValuesSet && (
          <GestureHandlerRootView className="flex-1 bg-inherit">
            <TimetableScreen />
          </GestureHandlerRootView>
        )) || <SetupScreen watchSubmit={() => watchSubmit()} />
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default App;
