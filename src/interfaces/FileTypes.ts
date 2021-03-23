export interface ResponseFile {
    status: number
    path: string
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
    file_id: number | null
}

export interface NoteObject {
    name: String
    type: "markdown"
    material: String | undefined
}

export interface ResponseNote {
    status: number
    content: string
    file_id: number
    message?: string
}