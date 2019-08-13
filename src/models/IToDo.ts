export interface IToDO {
    _id: TimeStamp;
    task: string;
    expiresOn: ExpirationOption;
    status: TaskStatus;
}


export const ExpireOptions:ExpirationOption[] = [
    {duration: 30, type: 'sec', text: '30 Sec'  },
    {duration: 1, type: 'min', text: '1 Min' },
    {duration: 5, type: 'min', text: '5 Min'  },
    {duration: 15, type: 'min', text: '15 Min'  },
    {duration: 30, type: 'min', text: '30 Min'  },
    {duration: 1, type: 'hr', text: '1 Hr'  },
];


interface ExpirationOption {
    duration: number;
    type: 'sec' | 'min' | 'hr',
    text: string;
}


type TimeStamp = number;


export type TODOSTATUS = TaskStatus.COMPLETED | TaskStatus.ON_GOING | TaskStatus.EXPIRED;

export enum TaskStatus {
    COMPLETED= 'completed',
    ON_GOING='on-going',
    EXPIRED='expired'
}