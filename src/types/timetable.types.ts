export type TimetableProps = {
  course: string;
  days: Day[];
};

export type TimetableTemplateProps = {
  periods: Period[];
};

export type Day = {
  day: string;
  periods: Period[];
};

export type Period = {
  start: string;
  end: string;
  subject: string;
  teacher?: string;
  room?: string;
};
