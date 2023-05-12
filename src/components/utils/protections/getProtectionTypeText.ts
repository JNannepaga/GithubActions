import { ProtectionType } from '../../constants';

const PROTECTION_POLICY_TYPE_LABELS = {
    [ProtectionType.TERM] : "Term",
    [ProtectionType.CRITICAL_ILLNESS]: "Critical Illness"
}

export function getProtectionType(protectionType: ProtectionType): string{
    if(PROTECTION_POLICY_TYPE_LABELS[protectionType]){
        return PROTECTION_POLICY_TYPE_LABELS[protectionType];
    }
    
    return "";
}