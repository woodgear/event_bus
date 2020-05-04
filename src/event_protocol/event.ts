//法律草案征求意见
export interface DraftLawRequest {
    name: string;
    time_range: string;
    people_count: number,
    opinion_count: number,
    status:DraftLawRequestStatus,
}

export enum DraftLawRequestStatus {
    Active="Active",
    Finished="Finished",
}


export interface DraftLawRequestSpider {
    ():Promise<Array<DraftLawRequest>>
}