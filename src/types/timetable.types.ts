export type Timetable = Day[];
export type Day = Lesson[];

export type Lesson = {
  time: {
    start: string;
    end: string;
  };
  subject: Subject[] | null;
};

export type Subject = {
  name: string;
  type: string;
  group: string;
  week: string;
  teacher: string;
  room: string;
};
