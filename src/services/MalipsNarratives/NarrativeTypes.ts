export enum MalipsNarrativeType {
    NUMBER,
    LITERAL
}

export interface MalipsNarrativeFragment {
    type: MalipsNarrativeType;
    value: string;
    path?: string;
    highlight?: boolean;
    strike?: boolean;
}

export type MalipsNarrativeFragments = MalipsNarrativeFragment[];