import { Input, InputProps } from "./Input";
import { Field, FieldProps } from "../fields/fields";
import React, { FunctionComponent, ReactElement } from 'react';

type omittedInputProps = "name" | "type";
type omitFieldProps = "children" | "onReset" | "status";

export interface TextInputProps 
    extends Omit<InputProps, omittedInputProps>,
        Omit<FieldProps, omitFieldProps>{

    };

export const TextInput: FunctionComponent<TextInputProps> = ({
    name,
    label,
    requiredMessage,
    rules,
    shouldUpdate,
    children,
   ...props
}): ReactElement => (
        <Field
            name={name}
            label={label}
            requiredMessage={requiredMessage}
            rules={rules}
            shouldUpdate={shouldUpdate}
        >
            <Input children={children} type="text" {...props}/>
        </Field>
    );
 