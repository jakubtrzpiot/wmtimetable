export interface Timetable {
  course: string;
  days: Day[];
}

interface Time {
  start: string;
  end: string;
}

export interface Day {
  day: string;
  lessons: Lesson[];
}

export interface Lesson {
  time: Time;
  subject: {
    name: string;
    teacher?: string;
    room?: string;
  };
}
