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
} from './src/utils/context';
import asyncStorage from './src/utils/asyncStorage';

const App: React.FC = () => {
  const [initialValuesSet, setInitialValuesSet] = useState(false);
  const [color, setColor] = useState('#daecff');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);
  const [setupOpen, setSetupOpen] = useState(false);

  useEffect(() => {
    useRefresh();
  }, [initialValuesSet]);

  const useRefresh = (item?: 'color' | 'lang' | 'submit' | 'setup') => {
    if (!item || item === 'lang')
      asyncStorage
        .getItem('language')
        .then(result => result && setLanguage(result));
    if (!item || item === 'color')
      asyncStorage.getItem('color').then(result => result && setColor(result));
    if (!item || item === 'submit')
      isInitialValuesSet().then(
        result => (
          setInitialValuesSet(result), setLoading(false), setSetupOpen(false)
        ),
      );
    if (item === 'setup') {
      setSetupOpen(!setupOpen);
      setLoading(false);
    }
  };

  return (
    <RefreshContext.Provider value={useRefresh}>
      <LanguageContext.Provider value={language}>
        <ThemeContext.Provider value={color}>
          <View className="flex-1 bg-[#121212]">
            {!loading ? (
              initialValuesSet ? (
                (!setupOpen && (
                  <GestureHandlerRootView className="flex-1 bg-inherit">
                    <TimetableScreen />
                  </GestureHandlerRootView>
                )) || <SetupScreen isSetup={!initialValuesSet} />
              ) : (
                <SetupScreen isSetup={!initialValuesSet} />
              )
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
//[x] make date slider functional
//[x] go to today on weekDay click
//[x] add polish language
//[x] make an app icon
//TODO get the metarial ui colors
//TODO add a splash screen
//TODO add better alerts
//TODO add readme
//[x] add color picker on long press
//FIXME fix a bug with date slider where it wont go to starting index on app launch
