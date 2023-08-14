export default interface Timetable {
  course: string;
  days: Day[];
}

interface Time {
  start: string;
  end: string;
}

interface Lesson {
  time: Time;
  subject: string;
  // teacher: string;
  // room: string;
}

interface Day {
  day: string;
  lessons: Lesson[];
}
