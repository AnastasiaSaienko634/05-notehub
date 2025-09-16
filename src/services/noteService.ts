// fetchNotes : має виконувати запит для отримання колекції нотаток із сервера. Повинна підтримувати пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук);
// createNote: має виконувати запит для створення нової нотатки на сервері. Приймає вміст нової нотатки та повертає створену нотатку у відповіді;
// deleteNote: має виконувати запит для видалення нотатки за заданим ідентифікатором. Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.
// interface FetchNotesResponse
import axios from "axios";
import type { Note } from "../types/note";
import type { CreateNoteRequest } from "../types/note";

axios.defaults.baseURL = "";

export const fetchNotes = async () => {
  const response = await axios.get("");
  return response.data;
};

export const createNote = async (data: CreateNoteRequest) => {
  const response = await axios.post<Note>("", data);
  return response.data;
};

export const deleteNote = async (noteId: string) => {
  await axios.delete<Note>(`${noteId}`);
};
