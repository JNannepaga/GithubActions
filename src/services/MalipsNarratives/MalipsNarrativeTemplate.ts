import { PrimitiveType } from 'intl-messageformat';
import { parse } from 'intl-messageformat-parser';
import { MessageFormatElement } from 'react-intl';
import { MalipsNarrativeFormatter, MalipsNarrativeOptions } from '.';
import { EntityFragment, MonetaryValue } from '../../components';
import { MalipsNarrativeFragments } from './NarrativeTypes';

export type MalipsNarrativeTemplateOutput = MalipsNarrativeFragments[];

export interface MalipsNarrativeTemplateConstructor<
    T extends EntityFragment,
    O extends MalipsNarrativeOptions> extends Function{
    new (options: O): MalipsNarrativeTemplate<T, O>;
}

export abstract class MalipsNarrativeTemplate<
    T extends EntityFragment,
    O extends MalipsNarrativeOptions>{

        public abstract readonly title: string;

        protected readonly map: Record<string, string> = {};

        public constructor(protected readonly options: O) {}

        public abstract match(enitity: Readonly<T>): boolean;

        public abstract generate(enitity: Readonly<T>): MalipsNarrativeTemplateOutput;

        protected format(
            enitity: Readonly<T>,
            message: string| MessageFormatElement[],
            values: Readonly<
                Record<string, 
                    | PrimitiveType
                    | {id?: string}
                    >
                > = {},
                map: Record<string, string> = {}
        ){
            const formatter = new MalipsNarrativeFormatter<T>(
                    enitity,
                    values,
                    {...this.map, ...map},
                    this.options
            );

            return formatter.parse(
                Array.isArray(message) ? message : parse(message)
            )
        }
};