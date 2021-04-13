import {IEvent} from "./interfaces"

export interface ResponseEvent {
    status?: number
    message?: string
    content?: Array<IEvent>
}

export interface Homework {
        EventEventId: number;
        author: number;
        content: string;
        createdAt: Date;
        grade: number | null;
        hw_id: number;
        updatedAt: Date;
}