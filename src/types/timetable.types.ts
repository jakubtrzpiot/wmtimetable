export type TimetableProps = {
  course: string;
  days: Day[];
};

export type TimetableTemplateProps = {
  periods: Period[];
};

type Time = {
  start: string;
  end: string;
};

export type Day = {
  day: string;
  periods: Period[];
};

export type Period = {
  time: Time;
  subject: {
    name: string;
    teacher?: string;
    room?: string;
  };
};
