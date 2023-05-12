import React, { FunctionComponent } from 'react';
import { ProtectionNarrativeEntity } from '../Narratives';

export interface ProtectionsListItemProps{
    scenarioValues: ProtectionNarrativeEntity;
    baselineValues?: ProtectionNarrativeEntity;
}

export const ProtectionsListItem: FunctionComponent<ProtectionsListItemProps> = ({
    scenarioValues,
    baselineValues
}) => {
    return(<div>
    </div>)
}