
interface ResponseEvent {
    status?: number
    message?: string
    content?: Array<IEvent>
}

interface Homework {
        EventEventId: number;
        author: number;
        content: string;
        createdAt: Date;
        grade: number | null;
        hw_id: number;
        updatedAt: Date;
}

interface IEvent {
    event_id?: string;
    name: string | undefined;
    type: string | undefined;
    description: string | undefined;
    startDate: Date | undefined;
    graded: boolean;
    endDate: Date | undefined;
    ClassClassId?: number | undefined;
    author_data?: {
      name: string
      last_name: string
      user_id: number
    }
    content?: string;
    hw_id?: number;
    grade?: number;
    class?: IClass;
  }
  interface eventInitialState {
    selected_date: Date;
    your_events: Array<IEvent>;
    event_by_date: Array<IEvent> | null;
    homework: Array<IEvent>;
    submitted: Array<Homework>;
  }