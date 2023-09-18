export type Timetable = {
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
  subject: Subject;
};

export type Subject = {
  name: string | null;
  type: string | null;
  group: string | null;
  week: string | null;
  teacher: string | null;
  room: string | null;
};
