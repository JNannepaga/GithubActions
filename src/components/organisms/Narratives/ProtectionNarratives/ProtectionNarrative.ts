import { ProtectionDescriptionTemplate } from "./ProtectionDescriptionTemplate/ProtectionDescriptionTemplate";
import { ProtectionNarrativeEntity, ProtectionNarrativeOptions } from "..";
import { MalipsNarrative } from "../../../../services";


export class ProtectionNarrative extends MalipsNarrative<
    ProtectionNarrativeEntity,
    ProtectionNarrativeOptions
>{

    protected description = ProtectionDescriptionTemplate;

    protected narrative = [];
}