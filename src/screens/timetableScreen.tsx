import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, View} from 'react-native';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {fetchTimetable, getDay, addDays, getWeekType} from '../utils/helpers';
import {SwipeComponent, Loader} from '../components/core';
import HeaderBar from '../components/headerBar';
import LessonTile from '../components/lessonTile';
import Empty from '../components/lessonTile/empty';
import {
  DateContext,
  ThemeContext,
  CardOpenContext,
  TimetableContext,
} from '../utils/context';
import {Day} from '../interfaces/timetable.interfaces';

const TimetableScreen = () => {
  const timetable = useContext(TimetableContext);
  const [today, setToday] = useState<Day>();
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [week, setWeek] = useState<string>('');
  const [cardOpen, setCardOpen] = useState<Array<boolean>>([]);
  const colorHex = useContext(ThemeContext);

  useEffect(() => {
    const day = getDay(date);

    const week = getWeekType(date);
    setWeek(week);

    timetable &&
      (setToday(timetable[(week === 'n' ? 0 : 1) * 7 + day]),
      setCardOpen(
        timetable[day] ? new Array(timetable[day]?.length).fill(false) : [],
      ));
  }, [date, timetable]);

  const handleSwipe = (dir: string) => {
    switch (dir) {
      case 'left':
        setDate(addDays(date, 1));
        break;
      case 'right':
        setDate(addDays(date, -1));
        break;
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchTimetable(true).then(() => setLoading(false));
  };

  return week && date ? (
    <>
      <DateContext.Provider value={{date, setDate}}>
        <HeaderBar week={week} date={date} />
      </DateContext.Provider>
      {today ? (
        <SwipeComponent onSwipe={dir => handleSwipe(dir)}>
          <SafeAreaView className="flex-1">
            <CardOpenContext.Provider value={{cardOpen, setCardOpen}}>
              <FlatList
                className="min-h-full px-4"
                showsVerticalScrollIndicator={true}
                data={today}
                renderItem={({item, index}) => (
                  <LessonTile i={index} {...item} />
                )}
                ItemSeparatorComponent={() => <View className="h-4" />}
                ListEmptyComponent={() => <Empty />}
                ListHeaderComponent={() => <View className="h-3" />}
                ListFooterComponent={() => <View className="h-5" />}
                refreshControl={
                  <RefreshControl
                    colors={['#121212']}
                    progressBackgroundColor={colorHex}
                    refreshing={loading}
                    onRefresh={() => handleRefresh()}
                  />
                }
              />
            </CardOpenContext.Provider>
          </SafeAreaView>
        </SwipeComponent>
      ) : (
        <Loader />
      )}
    </>
  ) : (
    <Loader />
  );
};

export default TimetableScreen;
