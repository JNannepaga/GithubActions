import * as en_US from "./locales/en-US.json";
import * as en_IN from "./locales/en-IN.json";
import * as te_IN from "./locales/te-IN.json";

export enum LanguageOptions { 
    en_US = "en-US",
    te_IN = "te-IN",
    en_IN = "en-IN" 
};

export const locales = { "en-US" : en_US, "en-IN": en_IN, "te-IN": te_IN };

export const APP_LOCALE:LanguageOptions = (process.env?.REACT_APP_LOCALE || "en-US") as LanguageOptions;