import { Homework } from "./EventTypes";

export interface ResponseFile {
  status: number;
  path: string;
}

export interface ResponseMultipleFile {
  status: number;
  content: Array<FileObject>;
  message?: string;
}

export interface FileObject {
  name?: string | undefined;
  type?: "pdf" | "video" | "image" | "audio" | "markdown" | "" | undefined | string;
  material?: File | string;
  description?: string;
  content?: string;
  file_id?: number | null;
  section_ref?: number
}

export class FileObjectClass implements FileObject{}

export interface FileInitialState extends FileObject {
  status: "Success" | "Pending" | "Failed" | "";
  error: {
    message: string;
  };
  your_files: ResponseMultipleFile["content"];
  selected: FileObject
}

export interface ResponseNote {
  status: number;
  content: string;
  file_id?: number;
  message?: string;
}


export interface RecentProps {
    content?: FileObject
    homework?: Homework
}

