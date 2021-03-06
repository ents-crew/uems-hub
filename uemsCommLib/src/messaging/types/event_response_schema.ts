export enum MsgIntention {
    CREATE = 'CREATE', READ = 'READ', UPDATE = 'UPDATE', DELETE = 'DELETE'
}


// Internal event representation in messages.
export type InternalEvent = {
    event_id: string,
    event_name: string,
    event_start_date: number,
    event_end_date: number,
    venue_ids: string,
    attendance: number
};

export type ReadRequestResponseMsg = {
    msg_id: number,
    status: number,
    msg_intention: MsgIntention,
    result: InternalEvent[]
};

export type RequestResponseMsg = {
    msg_id: number,
    status: number,
    msg_intention: MsgIntention,
    result: string[] // The ids of the event(s) effected.
};
