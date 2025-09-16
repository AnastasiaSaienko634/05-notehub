export interface Note {
  title: string;
  content: string;
  tag: string;
}

export interface CreateNoteRequest {
  data: Note;
}
