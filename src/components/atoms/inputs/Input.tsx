import React, { FC, FunctionComponent } from 'react';

import {Input as AntDesignInput} from "antd";
import {
    InputProps as AntDesignInputProps,
    GroupProps,
    SearchProps,
    PasswordProps,
    TextAreaProps} from 'antd/lib/input'
import { PercentageInput } from './PercentageInput';

export interface InputProps extends AntDesignInputProps{
    children?: React.ReactNode
};

interface CompoundedInputComponent {
    Group: FC<GroupProps>;
    Search: FC<SearchProps>;
    TextArea: FC<TextAreaProps>;
    Password: FC<PasswordProps>;
    Percentage: typeof PercentageInput;
}

export const Input : FunctionComponent<InputProps> & CompoundedInputComponent = ({
    children,
    ...props
}) => {
    return(<AntDesignInput {...props}>{children}</AntDesignInput>)
};

Input.Group = AntDesignInput.Group;
Input.Search = AntDesignInput.Search;
Input.TextArea = AntDesignInput.TextArea;
Input.Password = AntDesignInput.Password;
Input.Percentage = PercentageInput;