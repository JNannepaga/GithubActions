import {EntityFragment} from '.';

export enum ProtectionType{
    TERM = "TERM",
    CRITICAL_ILLNESS = "CRITICAL_ILLNESS"
}

export interface ProtectionFragment extends EntityFragment {
    policyType: ProtectionType;
    description: string;
    startYear: number;
    endYear: number;
}