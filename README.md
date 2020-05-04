# Event
1. [法律草案征求列表](http://www.npc.gov.cn/flcaw/)
```ts
export interface DraftLawRequest {
    name: string;
    time_range: string;
    people_count: number,
    opinion_count: number,
    status:DraftLawRequestStatus,
}

export enum DraftLawRequestStatus {
    Active,
    Finished,
}
```