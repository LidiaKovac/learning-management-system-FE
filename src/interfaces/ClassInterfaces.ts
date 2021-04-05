import { RouteComponentProps } from "react-router";
import { FileObject } from "./FileTypes";
import { User } from "./interfaces";

export interface IClass {
    class_id?: number
    name?: string | undefined
    description?: string | undefined
    author?: number | undefined
    author_data?: User
    
}

export interface SingleProps {
    c: IClass
    onClick?: Function
}

export interface ResClass {
    author: number
    class_id: number
    description: string
    name: string
    createdAt: Date
    updatedAt: Date
}

export class SelectClass{
    constructor(label:string, value:number) {
        this.label = label;
        this.value = value;
    }
    value: number | undefined
    label: string | undefined
}

export interface SingleClassProps {
    id: string
}

export interface Section {
    name?: string
    description?: string
    files?: Array<FileObject>
}

export interface SectionReqBody {
    section?: Section
    files?: FileObject
}