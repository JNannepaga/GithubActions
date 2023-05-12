import React, { FunctionComponent, ReactElement } from 'react';

import { Input, InputProps } from "./Input";

import { Field, FieldProps } from "../fields/fields";

import { isValidPassword } from '../../../utils';

type omittedInputProps = "name" | "type";
type omitFieldProps = "children" | "onReset" | "status";

export interface PasswordInputProps 
    extends Omit<InputProps, omittedInputProps>,
        Omit<FieldProps, omitFieldProps>{
         validate?: boolean;
    };

export const PasswordInput: FunctionComponent<PasswordInputProps> = ({
    name,
    label,
    requiredMessage,
    rules = [],
    validate = true,
    shouldUpdate,
   ...props
}): ReactElement => {

    type val = { validator: (_: any, value: any) => Promise<void>; }
    const validator : val | undefined = validate 
    ? {
            validator: (_, value): Promise<void> =>
            isValidPassword(value) 
                ? Promise.resolve()
                : Promise.reject('Please enter 10 digit Number!') 
        }
    : undefined; 
   return(
      <Field
            name={name}
            label={label}
            requiredMessage={requiredMessage}
            rules={validator ? [validator, ...rules] : rules}
            shouldUpdate={shouldUpdate}
        >
            <Input.Password {...props}/>
        </Field>
   );
};
 