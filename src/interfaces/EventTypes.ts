export interface IEvent {
    name: String
}

export interface ResponseEvent {
    status: number
    message?: string
    content?: Array<IEvent>
}