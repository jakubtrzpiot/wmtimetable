import {createContext, Dispatch, SetStateAction} from 'react';

export const ThemeContext = createContext('#daecff');

export const LanguageContext = createContext('pl');

export const RefreshContext = createContext(
  (item?: 'color' | 'lang' | 'submit' | 'setup') => {},
);

interface DateContextType {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

export const DateContext = createContext<DateContextType>({
  date: new Date(),
  setDate: () => {},
});

interface cardOpenContextType {
  cardOpen: Array<boolean>;
  setCardOpen: Dispatch<SetStateAction<Array<boolean>>>;
}

export const CardOpenContext = createContext<cardOpenContextType>({
  cardOpen: [],
  setCardOpen: () => {},
});
