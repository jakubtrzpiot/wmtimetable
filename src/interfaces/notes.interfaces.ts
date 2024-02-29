import {Dispatch, SetStateAction} from 'react';
export type Notes = Note[];

export interface Note {
  lessonid: number;
  content: string;
  date: Date;
}

interface noteRemoveProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  removeNote: (confirm: boolean) => void;
}

interface editNoteProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  note: string;
}
