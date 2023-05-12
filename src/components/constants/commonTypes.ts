export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Decimal: number;
    DateTime: string;
    Date: string;
    Guid: string;
}

export enum JurisdictionType{
    UK,
    AUS
}

export enum LocationType{
    Margirita,
    LiverPool
}

export enum CurrencyType{
    Gbp =  "GBP",
    Inr = "INR",
}

export type MonetaryValue = {
    amount: Scalars["Decimal"];
    currency: CurrencyType
}


export type PersonFragment = {
    id: string,
    name: string,
    knownAs: string,
    Jurisdiction: JurisdictionType,
    Location: LocationType
}

export type OwnerFragment  = {
    PercentageOwned: number,
    Person: PersonFragment
}

export type OwnedByFragment = OwnerFragment[];

export type HeadOfHouseholdFragment = PersonFragment[];

export enum EventType {
    System = "SYSTEM",
    Custom = "CUSTOM",
    Retire = "RETIRE",
    Illness = "ILLNESS",
    Death = "DEATH"
}

export type EventFragment = {
    id: Scalars["Guid"];
    eventName?: Scalars["String"];
    eventType?: EventType;
    person?: PersonFragment;
    year?: Scalars["Int"];
}

export interface EntityFragment {
    clientId: Scalars["Guid"];
    scenarioId: Scalars["Guid"];
    entityId: Scalars["Guid"];
    isExcluded: boolean;
    notes: string;
    ownedBy: OwnedByFragment;
}

export enum EntityTypes {
    BUSINESS,
    PROTECTION,
}