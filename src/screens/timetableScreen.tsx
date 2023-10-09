import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView, View} from 'react-native';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {Day} from '../interfaces/timetable.interfaces';
import {
  fetchTimetable,
  getTimetableByDay,
  getDay,
  addDays,
  getWeekType,
} from '../utils/helpers';
import {SwipeComponent, Loader} from '../components/core';
import HeaderBar from '../components/headerBar';
import LessonTile from '../components/lessonTile';
import Empty from '../components/lessonTile/empty';
import {DateContext, ThemeContext, CardOpenContext} from '../utils/context';

const TimetableScreen = () => {
  const [timetable, setTimetable] = useState<Day>();
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [week, setWeek] = useState<string>('');
  const [day, setDay] = useState<number>(0);
  const [cardOpen, setCardOpen] = useState<Array<boolean>>([]);
  const colorHex = useContext(ThemeContext);

  useEffect(() => {
    const day = getDay(date);
    setDay(day);

    const week = getWeekType(date);
    setWeek(week);

    getTimetableByDay(day, week)
      .then(
        (data: Day) => (
          setTimetable(data),
          setCardOpen(data ? new Array(data.length).fill(false) : [])
        ),
      )
      .catch(err => console.log(err));
  }, [date]);

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
      {timetable || day === 5 || day === 6 ? (
        <SwipeComponent onSwipe={dir => handleSwipe(dir)}>
          <SafeAreaView className="flex-1">
            <CardOpenContext.Provider value={{cardOpen, setCardOpen}}>
              <FlatList
                className="min-h-full pt-3 px-4"
                showsVerticalScrollIndicator={true}
                data={timetable}
                renderItem={({item, index}) => (
                  <LessonTile i={index} {...item} />
                )}
                ItemSeparatorComponent={() => <View className="h-4" />}
                ListEmptyComponent={() => <Empty />}
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
