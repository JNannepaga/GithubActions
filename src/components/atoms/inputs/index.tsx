import { TextInput } from "./TextInput";
import { MobileInput } from "./MobileInput";
import { PasswordInput } from "./PasswordInput";
import { PercentageInput } from "./PercentageInput";
import React, { ReactNode } from "react";

interface ChildMalipsInputComponents{
    TextInput: typeof TextInput;
    MobileInput: typeof MobileInput;
    PasswordInput: typeof PasswordInput;
    PercentageInput: typeof PercentageInput;
}

export const MalipsInput : ChildMalipsInputComponents =({
    children
}:{
    children: ReactNode
}) => 
    (<>{children}</>);

MalipsInput.TextInput = TextInput;
MalipsInput.MobileInput = MobileInput;
MalipsInput.PasswordInput = PasswordInput;
MalipsInput.PercentageInput = PercentageInput;