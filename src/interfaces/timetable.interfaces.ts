export type Timetable = Day[];
export type Day = Lesson[] | null;

export interface Lesson {
  time: Time;
  subject: Subject | Subject[];
}

export interface Time {
  start: string;
  end: string;
}

export interface Subject {
  name: string;
  type: string;
  group: string;
  week: string;
  teacher: string;
  room: string;
}
