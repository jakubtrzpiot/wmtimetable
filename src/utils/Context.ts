import {createContext, Dispatch, SetStateAction} from 'react';
import {Timetable} from '../interfaces/timetable.interfaces';

export const ThemeContext = createContext('#c5e1f5');

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

interface CardOpenContextType {
  cardOpen: Array<boolean>;
  setCardOpen: Dispatch<SetStateAction<Array<boolean>>>;
}

export const CardOpenContext = createContext<CardOpenContextType>({
  cardOpen: [],
  setCardOpen: () => {},
});

export const TimetableContext = createContext<Timetable>([]);

// interface ShowFreeContextType {
//   showFree: boolean;
//   setShowFree: Dispatch<SetStateAction<boolean>>;
// }

// export const ShowFreeContext = createContext<ShowFreeContextType>({
//   showFree: false,
//   setShowFree: () => {},
// });
