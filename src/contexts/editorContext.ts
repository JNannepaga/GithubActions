import { createContext } from "react";

export interface EditorContextValues{
    actionName?: string;
    entityTitle?: string;
}

export const editorContext = createContext<EditorContextValues | null>(null);

