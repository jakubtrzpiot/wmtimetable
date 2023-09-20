export type Timetable = Day[];
export type Day = Lesson[];

export type Lesson = {
  time: Time;
  subject: Subject | Subject[];
};

export type Time = {
  start: string;
  end: string;
};

export type Subject = {
  name: string;
  type: string;
  group: string;
  week: string;
  teacher: string;
  room: string;
};
