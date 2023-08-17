import React, {useState, useEffect} from 'react';
import {ScrollView, Text} from 'react-native';
import parseTimetable from './src/api/parser';
import {Timetable, Lesson, Day} from './src/interfaces/parser.interfaces';

const App: React.FC = () => {
  const [timetable, setTimetable] = useState<Timetable>();

  useEffect(() => {
    parseTimetable(34)
      .then(res => setTimetable(res))
      .catch(err => console.error(err.message));
  }, []);

  return (
    <ScrollView>
      {timetable?.days.map((day: Day) =>
        day.lessons.map((lesson: Lesson, i: number) => (
          <Text key={i}>{`${
            lesson.subject ? lesson.subject.name : ' - '
          }`}</Text>
        )),
      )}
    </ScrollView>
  );
};

export default App;
