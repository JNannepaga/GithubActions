import React, { FunctionComponent, ReactElement } from 'react';

import { Input, InputProps } from "./Input";

import { Field, FieldProps } from "../fields/fields";

import { isValidMobileNumber } from "../../../utils";

type omittedInputProps = "name" | "type";
type omitFieldProps = "children" | "onReset" | "status";

export interface MobileInputProps 
    extends Omit<InputProps, omittedInputProps>,
        Omit<FieldProps, omitFieldProps>{
         validate?: boolean;
    };

export const MobileInput: FunctionComponent<MobileInputProps> = ({
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
                isValidMobileNumber(value) 
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
            <Input type="text" {...props}/>
        </Field>
   );
};
 