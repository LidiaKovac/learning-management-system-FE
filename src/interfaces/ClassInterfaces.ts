export interface IClass {
    class_id?: number
    name?: string | undefined
    description?: string | undefined
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
    constructor(label:string, value:string | number) {
        this.label = label;
        this.value = value;
    }
    value: string | number
    label: string
}