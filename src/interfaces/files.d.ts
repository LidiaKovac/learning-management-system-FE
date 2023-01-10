
interface ResponseFile {
  status: number;
  path: string;
}

interface ResponseMultipleFile {
  status: number;
  content: Array<FileObject>;
  message?: string;
}

interface FileObject {
  name?: string | undefined;
  type?: "pdf" | "video" | "image" | "audio" | "markdown" | "" | undefined | string;
  material?: File | string;
  description?: string;
  content?: string;
  file_id?: number | null;
  section_ref?: number
}

class FileObjectClass implements FileObject{}

interface FileInitialState extends FileObject {
  status: "Success" | "Pending" | "Failed" | "";
  error: {
    message: string;
  };
  your_files: ResponseMultipleFile["content"];
  selected: FileObject
}

interface ResponseNote {
  status: number;
  content: string;
  file_id?: number;
  message?: string;
}


interface RecentProps {
    content?: FileObject
    homework?: Homework
}

