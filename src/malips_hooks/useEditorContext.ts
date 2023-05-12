import { editorContext, EditorContextValues } from '../contexts';
import { useContext } from 'react';

export function useEditorContext(){
    const editorData = useContext<EditorContextValues | null>(editorContext);
    
    if(!editorData){
        throw new Error("Missing editorData values, was editorContextProvider used?");
    }

    return editorData;
}