import {createContext} from 'react';

export const ThemeContext = createContext('#daecff');
export const LanguageContext = createContext('en');
export const RefreshContext = createContext(
  (item?: 'color' | 'lang' | 'submit' | 'setup') => {},
);
export const SetDateContext = createContext((day: Date) => {});
