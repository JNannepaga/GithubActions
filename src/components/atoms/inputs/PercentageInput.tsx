import React from 'react';
import { Input, InputProps } from "./Input";
import { Field, FieldProps } from "../fields/fields";

type omittedInputProps = "name" | "type";
type omitFieldProps = "children" | "onReset" | "status";


export interface PercentageInputProps
    extends Omit<InputProps, omittedInputProps>,
        Omit<FieldProps, omitFieldProps>{
}

export const PercentageInput: React.FunctionComponent<PercentageInputProps> = ({
    name,
    label,
    requiredMessage,
    rules,
    shouldUpdate,
    ...props
}) =>{
    return(
    <Field
        name={name}
        label={label}
        requiredMessage={requiredMessage}
        rules={rules}
        shouldUpdate={shouldUpdate}
        suffix="%"
    >
        <Input type="number" {...props}/>
    </Field>)
}