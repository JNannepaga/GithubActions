import { Select } from '../../atoms';
import React, { FunctionComponent } from 'react';
import { FormInstance } from '../../atoms';
import { EntityFragment, ProtectionType, ProtectionFragment } from '../../constants';

export interface ProtectionTypeSectionProps<T extends EntityFragment = ProtectionFragment> {
    form: FormInstance;
    initialValues?: T;
}

const ProtectionTypes = [
    ProtectionType.CRITICAL_ILLNESS,
    ProtectionType.TERM
]

export const PROTECTION_TYPE_PATH = "policyType";

export const ProtectionTypeSection: FunctionComponent<ProtectionTypeSectionProps>=({form, initialValues})=>{
    const { Option } = Select;
    const { setFieldsValue, getFieldValue } = form;
    const protectionType = getFieldValue(PROTECTION_TYPE_PATH) || initialValues?.policyType;

return <div> 
        <Select name={PROTECTION_TYPE_PATH} style={{width: "250px"}}>
            {ProtectionTypes.map((type, index) => <Option key={index} value={type}>{type}</Option>)}
        </Select>
</div>;
}