import React, {useState, useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {Day} from '../types/timetable.types';
import {
  fetchTimetable,
  getTimetableByDay,
  getDay,
  addDays,
  getWeekType,
} from '../utils/helpers';
import {SwipeComponent, Loader} from '../components';
import HeaderBar from '../components/headerBar';
import LessonTile from '../components/lessonTile';
import Empty from '../components/lessonTile/empty';
import {SetDateContext} from '../utils/context';

const TimetableScreen = () => {
  const [timetable, setTimetable] = useState<Day>();
  const [didRefresh, setDidRefresh] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [week, setWeek] = useState<string>('');
  const [day, setDay] = useState<number>(0);

  useEffect(() => {
    const day = getDay(date);
    setDay(day);

    const week = getWeekType(date);
    setWeek(week);

    didRefresh
      ? getTimetableByDay(day, week)
          .then((data: Day) => setTimetable(data))
          .catch(err => console.log(err))
      : null;
    setDidRefresh(false);
  }, [date, didRefresh]);

  const handleSwipe = (dir: string) => {
    switch (dir) {
      case 'left':
        setDate(addDays(date, 1));
        setDidRefresh(true);
        break;
      case 'right':
        setDate(addDays(date, -1));
        setDidRefresh(true);
        break;
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);

    fetchTimetable(true).then(
      () => (setIsRefreshing(false), setDidRefresh(true)),
    );
  };

  return week && date ? (
    <>
      <SetDateContext.Provider
        value={date => (setDate(date), setDidRefresh(true))}>
        <HeaderBar week={week} date={date} />
      </SetDateContext.Provider>
      {timetable || day === 5 || day === 6 ? (
        <SwipeComponent onSwipe={dir => handleSwipe(dir)}>
          <SafeAreaView className="flex-1">
            <FlatList
              className="min-h-full pt-2 px-4"
              showsVerticalScrollIndicator={true}
              data={timetable}
              renderItem={({item}) => <LessonTile {...item} />}
              ItemSeparatorComponent={() => <View className="h-4" />}
              ListEmptyComponent={() => <Empty />}
              ListFooterComponent={() => (
                <View className="h-4" /> //add space at the bottom
              )}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={() => handleRefresh()}
                />
              }
            />
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
