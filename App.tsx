import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {isInitialValuesSet} from './src/utils/helpers';
import TimetableScreen from './src/screens/timetableScreen';
import SetupScreen from './src/screens/setupScreen';
import {Loader} from './src/components';
import {
  ThemeContext,
  LanguageContext,
  RefreshContext,
} from './src/utils/Context';
import asyncStorage from './src/utils/asyncStorage';

const App: React.FC = () => {
  const [initialValuesSet, setInitialValuesSet] = useState(false);
  const [color, setColor] = useState('#daecff');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    useRefresh();
  }, [initialValuesSet]);

  const useRefresh = (item?: 'color' | 'lang' | 'submit') => {
    if (!item || item === 'lang')
      asyncStorage
        .getItem('language')
        .then(result => result && setLanguage(result));
    if (!item || item === 'color')
      asyncStorage.getItem('color').then(result => result && setColor(result));
    if (!item || item === 'submit')
      isInitialValuesSet().then(
        result => (setInitialValuesSet(result), setLoading(false)),
      );
  };

  return (
    <RefreshContext.Provider value={useRefresh}>
      <LanguageContext.Provider value={language}>
        <ThemeContext.Provider value={color}>
          <View className="flex-1 bg-[#121212]">
            {!loading ? (
              (initialValuesSet && (
                <GestureHandlerRootView className="flex-1 bg-inherit">
                  <TimetableScreen />
                </GestureHandlerRootView>
              )) || <SetupScreen />
            ) : (
              <Loader />
            )}
          </View>
        </ThemeContext.Provider>
      </LanguageContext.Provider>
    </RefreshContext.Provider>
  );
};

export default App;

//BEFORE RELEASE
//TODO make date slider functional
//TODO got to today on wekDay click
//TODO add polish language
