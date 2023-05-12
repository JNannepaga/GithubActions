import { APP_LOCALE, LanguageOptions } from "../../config";
import { EntityFragment, EventFragment, HeadOfHouseholdFragment } from "../../components";
import {
    MalipsNarrativeFragments,
    MalipsNarrativeTemplate,
    MalipsNarrativeTemplateConstructor,
    MalipsNarrativeTemplateOutput,
    MalipsNarrativeSection,
    MalipsNarrativeSectionConstructor,
    MalipsNarrativeSectionOutput,
    MalipsNarrativeSectionOutputMap,
    MalipsNarrativeFragment
} from '.';

export type MalipsNarrativeOutput = {
    description?: MalipsNarrativeTemplateOutput;
    narrative?: MalipsNarrativeSectionOutputMap;
}

export interface MalipsNarrativeOptions {
    language: LanguageOptions;
    headsOfHousehold?: HeadOfHouseholdFragment | null;
    events?: EventFragment[] | null;
}

export interface MalipsNarrativeConstructor<
    T extends EntityFragment,
    O extends MalipsNarrativeOptions
> extends Function{
    new (options?: Readonly<Partial<MalipsNarrativeOptions>>): MalipsNarrative<T, O>;
}

export abstract class MalipsNarrative<
    T extends EntityFragment,
    O extends MalipsNarrativeOptions
    >{
        protected readonly options: O;

        protected readonly defaultNarrativeOptions: MalipsNarrativeOptions = {
            language: APP_LOCALE
        };

        protected abstract description?: MalipsNarrativeTemplateConstructor<T, O>;

        protected abstract narrative?: Array<MalipsNarrativeSectionConstructor<T, O>>;

        public constructor(options: Readonly<O>){
            this.options = { ...this.defaultNarrativeOptions, ...options };
        }

        public generate(
            entity: Readonly<T> | [Readonly<T>] | [Readonly<T>, Readonly<T> | undefined | null]
        ): MalipsNarrativeOutput{

            const [ scenarioValues, baselineValues ] = Array.isArray(entity) ? entity : [entity];

            const description = this.description 
                ? this.generateDescriptionSection(
                    new this.description(this.options),
                    scenarioValues,
                    baselineValues)
                : undefined;

            const narrative = this.generateNarrativeSections(
                scenarioValues,
                baselineValues,
                this.narrative
            )

            return {
                description,
                narrative
            };    
        }

        private generateDescriptionSection(
            description: MalipsNarrativeTemplate<T, O>,
            scenarioValues: Readonly<T>,
            baselineValues?: Readonly<T> | null
        ):MalipsNarrativeTemplateOutput{
            const sectionTemplateOutput = description.generate(scenarioValues);

            if(baselineValues) {
                const baselineTemplateContent = description.generate(baselineValues);

                return sectionTemplateOutput.map((fragments, index) => 
                    this.formatFragmentDifference(fragments, baselineTemplateContent?.[index]));
            }

            return sectionTemplateOutput;
        }

        private generateNarrativeSections(
            scenarioValues: Readonly<T>,
            baselineValues?: Readonly<T> | null,
            sections?: Readonly<Array<MalipsNarrativeSectionConstructor<T,O>>>   
        ):MalipsNarrativeSectionOutputMap{
            const narrative: MalipsNarrativeSectionOutputMap = new Map();
            const hits: string[] = [];

            if(!sections || sections.length === 0){
                return narrative;
            }

            for (const Section of sections){
                const section = new Section(this.options);
                const output = section.generate(scenarioValues);

                if(output.size){
                    hits.push(section.title);

                    narrative.set(
                        section,
                        baselineValues
                            ? this.formatNarrativeDifferences(output, section.generate(baselineValues))
                            : output
                    )
                }
            }

            if(baselineValues){
                for (const Section of sections){
                    const section = new Section(this.options);

                    if(!hits.includes(section.title)){
                        const output = new Map();

                        const sectionOutput = section.generate(baselineValues).entries();

                        for(const [title, sectionTemplateOutput] of sectionOutput) {
                            output.set(
                                title,
                                this.mergeWithSectionFragments(sectionTemplateOutput,{
                                    strike: true
                                })
                            )
                        }

                        if (output.size){
                            narrative.set(section, output);
                        }
                    }
                }    
            }

            return narrative;
        }

        private formatFragmentDifference(
            scenarioNarrativeOutput: Readonly<MalipsNarrativeFragments>,
            baselineNarrativeOutput: Readonly<MalipsNarrativeFragments> | undefined
        ): MalipsNarrativeFragments {
            const output: MalipsNarrativeFragments= [];

            for(const [index, scenarioFragment] of scenarioNarrativeOutput.entries()){
                if(baselineNarrativeOutput?.[index]){
                    const baselineFragment = baselineNarrativeOutput?.[index];

                    if(scenarioFragment.value === baselineFragment.value &&
                        scenarioFragment.type === baselineFragment.type &&
                        scenarioFragment.path === baselineFragment.path){
                            output.push({
                                ...scenarioFragment,
                                highlight: false
                            })

                            continue;
                        }
                }
                output.push({
                    ...scenarioFragment,
                    highlight: true
                })
            }
            return output;
        }

        private formatNarrativeDifferences(
            scenarioNarrativeOutput: Readonly<MalipsNarrativeSectionOutput>,
            baselineNarrativeOutput: Readonly<MalipsNarrativeSectionOutput>
        ): MalipsNarrativeSectionOutput{
            const output: MalipsNarrativeSectionOutput = new Map(scenarioNarrativeOutput.entries());

            for (const [title, sectionTemplateOutput] of scenarioNarrativeOutput.entries()){
                if (baselineNarrativeOutput.has(title)){
                    const baselineTemplateContent = baselineNarrativeOutput.get(title);

                    output.set(
                        title,
                        sectionTemplateOutput.map((fragments, index) =>
                            this.formatFragmentDifference(fragments, baselineTemplateContent?.[index]))
                    );
                }
                else{
                    output.set(
                        title,
                        this.mergeWithSectionFragments(sectionTemplateOutput, {
                            highlight: true
                        })
                    )
                }
            }

            for (const [title, sectionTemplateOutput] of baselineNarrativeOutput.entries()){
                if(!output.has(title)){
                    output.set(
                        title,
                        this.mergeWithSectionFragments(sectionTemplateOutput, {
                            strike: true
                        })
                    );
                }
            }

            return output;
        }

        private mergeWithSectionFragments(
            section: Readonly<MalipsNarrativeTemplateOutput>,
            values: Partial<MalipsNarrativeFragment>
        ): MalipsNarrativeTemplateOutput{
                return section.map(fragments =>
                    fragments.map(fragment => ({ ...fragment, ...values })))
        }
}


// Todo: Please complete Narrative scetions.