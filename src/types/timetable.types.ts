export type TimetableProps = {
  course: string;
  days: Day[];
};

export type Day = {
  lessons: Lesson[];
};

export type Lesson = {
  time: {
    start: string;
    end: string;
  };
  subjects: Subject[] | null;
};

export type Subject = {
  name: string;
  type: string;
  group: string;
  week: string;
  teacher: string;
  room: string;
};
