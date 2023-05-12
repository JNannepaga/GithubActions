import { createContext } from "react";
import { EntityFragment, FormInstance } from "../components";

export interface FormContextValues<T extends EntityFragment = EntityFragment>{
    initialValues?: T;
    scenarioValues?: T;
    baselineValues?: T;
}

export const formContext = createContext<FormContextValues | null>(null);