import { ReactElement, ReactNode } from 'react';
import {formContext, FormContextValues} from '../../contexts';
import { EntityFragment } from '../constants';

export const FormContextProvider = <T extends EntityFragment>({
    value,
    children
 }:{
    value: FormContextValues<T>;
    children?: ReactNode;
 }): ReactElement =>(<formContext.Provider value={value}>{children}</formContext.Provider>);