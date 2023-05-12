import { 
    Form as AntDesignForm, 
    FormInstance as  AntDesignFormInstance, 
    FormProps as AntDesignFormProps} from "antd";
import React, { ReactElement } from 'react';

type CompoundedFormComponents = {
    Item: typeof AntDesignForm.Item;
    useForm: typeof AntDesignForm.useForm;
}

export type FormInstance = AntDesignFormInstance;

export interface FormProps extends Omit<AntDesignFormProps, "onSubmit">{
    layout?: AntDesignFormProps["layout"],
    onSubmit?: (values: any) => any;
    children?: React.ReactNode;
} 

export const Form: React.FunctionComponent<FormProps> & CompoundedFormComponents = ({
    onSubmit,
    layout,
    children,
    ...props
}): ReactElement  => {
    return(
        <AntDesignForm
            onFinish={onSubmit}
            layout={layout || "vertical"}
            {...props}
        >
            {children}
        </AntDesignForm>)
};

Form.Item = AntDesignForm.Item;
Form.useForm = AntDesignForm.useForm;