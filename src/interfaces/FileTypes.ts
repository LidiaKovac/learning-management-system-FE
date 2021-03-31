export interface ResponseFile {
    status: number
    path: string
}

export interface ResponseMultipleFile {
    status: number
    content: Array<FileObject>
    message?: string
}

export interface FileObject {
    name?: string | undefined
    type?: "pdf" | "video" | "image" | "audio" | "markdown" | "" | undefined 
    material?: File | string
    description?: string
    file_id?: number | null
}


export interface FileInitialState extends FileObject {
    status: "Success" | "Pending" | "Failed" | ""
    error: {
        message: string
    },
    your_files: ResponseMultipleFile["content"]
}

export interface ResponseNote {
    status: number
    content: string 
    file_id?: number
    message?: string
}