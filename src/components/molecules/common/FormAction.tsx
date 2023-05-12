import React  from "react";
import {useEditorContext} from '../../../malips_hooks';
import { Button } from "../../atoms";

export const FormActions = ()=>{
    const {actionName, entityTitle} = useEditorContext();

    return(<Button htmlType="submit">{actionName} {entityTitle}</Button>)
}