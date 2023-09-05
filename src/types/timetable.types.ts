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
  subject: {
    name: string;
    teacher: string;
    room: string;
    type: string;
    group: string;
    week: string;
  };
};
