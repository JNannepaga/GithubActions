import { IntlMessageFormat, PrimitiveType } from 'intl-messageformat';
import memoize from 'fast-memoize';
import { get, isObject, isArray } from 'lodash-es';
import { EntityFragment, MonetaryValue } from '../../components';

import { ArgumentElement, isArgumentElement, isLiteralElement, LiteralElement } from 'intl-messageformat-parser';

import { MalipsNarrativeFragments, MalipsNarrativeType } from './NarrativeTypes';
import { MalipsNarrativeOptions } from './MalipsNarrative';
import { MessageFormatElement } from 'react-intl';

interface ValueWithOptionalPath<T = PrimitiveType>{
    id?: string;
    value: T;
    path?: string;
}

export class MalipsNarrativeFormatter<T extends EntityFragment> {
    private static readonly formats = {
        number: {
            ...IntlMessageFormat.formats.number
        }
    }

    private static readonly formatters = {
        getNumberFormat: memoize((locale, options)=>new Intl.NumberFormat(locale, options))
    }

    public constructor(
        private readonly enitity: T, 
        private readonly values: Record<string, 
        | PrimitiveType
        | {id?: string}
        >,
        private readonly map: Record<string, string>,
        private readonly options: MalipsNarrativeOptions 
    ) {}

    public parse(
        elements: Readonly<MessageFormatElement[]>,
        currentPluralValue?: Readonly<number>
    ): MalipsNarrativeFragments{
        const output: MalipsNarrativeFragments = [];

        // for(const element of elements){
        //     if(isLiteralElement(element.type)){
        //         output.push(...this.formatLiteralElement(element));
        //     }
        //     if(isArgumentElement(element)){
        //         output.push(...this.formatArgumentElement(element));
        //     }
        // }
        return output;
    }

    
    protected formatLiteralElement(element: Readonly<LiteralElement>): MalipsNarrativeFragments{
        
        return[
            {
                type: MalipsNarrativeType.LITERAL,
                value: element.value,
            },
        ]
    }

    protected formatArgumentElement(element: Readonly<ArgumentElement>): MalipsNarrativeFragments{
        const { value } = this.findValueByPath(element.value);

        return[
            {
                type: MalipsNarrativeType.LITERAL,
                value: typeof value === "string" || typeof value === "number" ? String(value) : "",
            },
        ]
    }

    protected findValueByPath(
        value: Readonly<string>,
        shouldReturnObject: Readonly<boolean> = false
    ): ValueWithOptionalPath | ValueWithOptionalPath<MonetaryValue>{
        
        const output = value in this.map
            ? {
                path: this.map[value],
                value: get(this.enitity, this.map[value]) as 
                    | PrimitiveType
                    | { amount?: number; currency?: string }
            }
            : {
                    value: this.values[value]
            };
        
        if(
            typeof output.value !== "string" &&
            typeof output.value !== "number" &&
            typeof output.value !== "boolean"){
                throw new Error(`Unexpected value type for ${value}`);
            }
        
        return output as ValueWithOptionalPath;
    }
}