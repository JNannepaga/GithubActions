import { EntityFragment } from '../../components';
import {
    MalipsNarrativeOptions,
    MalipsNarrativeTemplateConstructor,
    MalipsNarrativeTemplateOutput
} from '.';

export type MalipsNarrativeSectionOutputMap = Map<
    MalipsNarrativeSection<any, any>,
    MalipsNarrativeSectionOutput
>;

export type MalipsNarrativeSectionOutput = Map<string, MalipsNarrativeTemplateOutput>;

export interface MalipsNarrativeSectionConstructor<
    T extends EntityFragment,
    O extends MalipsNarrativeOptions
  > extends Function{
        new (options: O): MalipsNarrativeSection<T, O>;
}

export abstract class MalipsNarrativeSection<
    T extends EntityFragment,
    O extends MalipsNarrativeOptions
>{
    public abstract readonly title: string;
    public abstract readonly templates: MalipsNarrativeTemplateConstructor<T, O>[];
    
    public constructor (protected readonly options: O) {}
    
    public generate(entity: Readonly<T>): MalipsNarrativeSectionOutput{
        const content: MalipsNarrativeSectionOutput = new Map();
        
        for(const Template of this.templates){
            const template = new Template(this.options);

            if(template.match(entity)) {
                const output = template.generate(entity);

                if(output.length){
                    content.set(template.title, output);
                }
            }
        }

        return content;
    }
}