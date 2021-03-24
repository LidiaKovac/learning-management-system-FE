export interface ResponseFile {
    status: number
    path: string
}



export interface ResponseMultipleFile {
    status: number
    content: Array<{
        type: string
        description: string
        name: string
    }>
    message?: String
}

export interface FileObject {
    name?: string | undefined
    type?: "pdf" | "video" | "image" | "audio" | "" | undefined 
    material?: File | undefined
}


export interface FileInitialState extends FileObject {
    status: "Success" | "Pending" | "Failed" | ""
    error: {
        message: String
    },
    file_id?: number | null
    your_files: ResponseMultipleFile["content"]
}

export interface NoteObject {
    name: String
    type: "markdown"
    material: String | undefined
}

export interface ResponseNote {
    status: number
    content: string 
    file_id?: number
    message?: string
}