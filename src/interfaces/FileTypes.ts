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
    error: String
}