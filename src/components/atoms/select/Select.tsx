import React, { FunctionComponent } from 'react';
import { Select as AntDesignSelect } from 'antd';
import { SelectProps as AntDesignSelectProps } from 'antd/lib/select';
import { Field, FieldProps } from "../fields/fields";


type omitFieldProps = "children" | "onReset" | "status";
export interface SelectProps extends AntDesignSelectProps, Omit<FieldProps, omitFieldProps>{

}

interface CompoundedSelectComponent 
    extends Pick<typeof AntDesignSelect, "Option"| "OptGroup"> {    
}

export const Select: FunctionComponent<SelectProps> & CompoundedSelectComponent = ({
    name,
    label,
    requiredMessage,
    rules,
    shouldUpdate,
    children,
    placeholder,
    ...props
}) => {
    return (
        <Field
        name={name}
        label={label}
        requiredMessage={requiredMessage}
        rules={rules}
        shouldUpdate={shouldUpdate}
    >
        <AntDesignSelect placeholder={placeholder} {...props}>
            {children}
        </AntDesignSelect>
    </Field>
)
 }

 Select.Option = AntDesignSelect.Option;
 Select.OptGroup = AntDesignSelect.OptGroup;