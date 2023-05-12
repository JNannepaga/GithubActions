import { 
    MalipsNarrativeTemplate,
    MalipsNarrativeTemplateOutput } from "../../../../../services";
import { ProtectionNarrativeEntity, ProtectionNarrativeOptions } from '../protectionTypes';
import { ProtectionFragment } from "../../../../constants";
import { APP_LOCALE } from "../../../../../config";
import { getProtectionType } from "../../../../utils/protections/getProtectionTypeText";

const locales = {
    "en-US": {
        FUTURE_START: "{protectionType} policy from {startYear}",
        PRE_EXISTING: "{protectionType} policy from {startYear}-{endYear}"
    },
    "en-IN": {
        FUTURE_START: "{protectionType} policy from {startYear}",
        PRE_EXISTING: "{protectionType} policy from {startYear}-{endYear}"
    },
    "te-IN": {
        FUTURE_START: "{protectionType} policy from {startYear}",
        PRE_EXISTING: "{protectionType} policy from {startYear}-{endYear}"
    }
}

export class ProtectionDescriptionTemplate extends MalipsNarrativeTemplate<
    ProtectionNarrativeEntity,
    ProtectionNarrativeOptions
 >{
     public readonly title: string = "Description";

     protected map = {
         startYear: "startYear",
         endYear: "endYear"
     }

     public match(): boolean {
         return true;
     }

     public generate(enitity: Readonly<ProtectionFragment>): MalipsNarrativeTemplateOutput {
        const { FUTURE_START, PRE_EXISTING } = locales[APP_LOCALE];
        const output: MalipsNarrativeTemplateOutput = [];

        if(enitity?.startYear && enitity?.endYear){
            if(enitity?.startYear >= new Date().getFullYear()){
                output.push(
                    this.format(enitity, FUTURE_START, {
                        //protectionType: getProtectionType(enitity.policyType)
                    })
                );
            }else{
                output.push(
                    this.format(enitity, PRE_EXISTING, {
                        // protectionType: getProtectionType(enitity.policyType)
                    })
                );
            }
        }

        return output;
     }
 }