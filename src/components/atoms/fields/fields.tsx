import React, { Fragment, ReactNode } from "react";
import { Form as AntDesignForm } from 'antd'
import { FormItemProps as AntDesignFormItemProps } from 'antd/lib/form';
import { MalipsTypography } from "../typography/Typography";

export interface FieldProps extends AntDesignFormItemProps{
   name: string | Array<string | number>;
   label?: ReactNode;
   requiredMessage?: string;
   prefix?: ReactNode;
   suffix?: ReactNode;
}

export const Field: React.FunctionComponent<FieldProps> = ({
   name,
   label,
   requiredMessage,
   prefix,
   suffix,
   rules = [],
   shouldUpdate,
   children,
   ...props
}) => {
   
   const id = Array.isArray(name) ? name.join("_") : name;

   function renderFieldContent(): React.ReactElement{
      

      const AddOnComponent = (element: ReactNode)=>{
         return(<MalipsTypography.Text className="ant-input-group-addon">{element}</MalipsTypography.Text>)
      }
      
     return(
        <Fragment>
           {prefix && AddOnComponent(prefix)}
           <AntDesignForm.Item
               label={label}
               name={id}
               rules={requiredMessage ? [{ required: true, message: requiredMessage }, ...rules] : rules}
               {...props}
            >
               {children}
            </AntDesignForm.Item>
            {suffix && AddOnComponent(suffix)}
        </Fragment>
      )
   }

   return <>
         {  shouldUpdate ? renderFieldContent : renderFieldContent() }
      </>   
}