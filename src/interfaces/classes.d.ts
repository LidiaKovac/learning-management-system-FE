

interface IClass {
    class_id?: number
    name?: string | undefined
    description?: string | undefined
    author?: number | undefined
    author_data?: User

}

interface SingleProps {
    c: IClass
    onClick?: Function
}

interface ResClass {
    author: number
    class_id: number
    description: string
    name: string
    createdAt: Date
    updatedAt: Date
}

class SelectClass {
    constructor(label: string, value: number) {
        this.label = label;
        this.value = value;
    }
    value: number | undefined
    label: string | undefined
}
interface classInitialState {
    your_classes: Array<IClass>;
    selected_class: {
        class: IClass;
        sections: Array<Section>;
        author_data?: {
            name: string;
            last_name: string;
            email: string;
        };
    };
}
interface SingleClassProps {
    id: string
}

interface Section {
    name?: string
    description?: string
    files?: Array<FileObject>
}

interface SectionReqBody {
    section?: Section
    files?: FileObject
}