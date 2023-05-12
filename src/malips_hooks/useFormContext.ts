import { formContext, FormContextValues } from '../contexts';
import { useContext } from 'react';
import { EntityFragment } from '../components';

export function useFormContext<T extends EntityFragment>(): FormContextValues<T>{
    const formData = useContext(formContext);
    
    if(!formData){
        throw new Error("Missing formContext values, was FormContextProvider used?");
    }

    return formData as FormContextValues<T>;
}