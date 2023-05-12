import { ReactElement, ReactNode } from 'react';
import {editorContext, EditorContextValues} from '../../contexts';

export const EditorContextProvider = ({
    value,
    children
 }:{
    value: EditorContextValues;
    children?: ReactNode;
 }): ReactElement =>(<editorContext.Provider value={value}>{children}</editorContext.Provider>);