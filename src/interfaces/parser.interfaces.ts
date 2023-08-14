export default interface Timetable {
  course: string;
  hours: Hour[];
  days: Day[];
}

interface Hour {
  start: string;
  end: string;
}

interface Lesson {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

interface Day {
  day: string;
  lessons: Lesson[];
}
