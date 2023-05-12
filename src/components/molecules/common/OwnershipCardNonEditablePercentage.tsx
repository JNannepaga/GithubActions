import React, { Fragment } from 'react';
import { Card } from '../../atoms/card/card';
import { useIntl } from "react-intl";
import { Button, Form, FormInstance, MalipsTypography } from '../../atoms';
import { findIndex } from 'lodash-es';
import { MalipsInput } from '../../atoms/inputs';
import { EntityFragment, OwnerFragment, PersonFragment } from '../../constants';


export const OWNED_BY_PATH = "OwnedBy";
export const OWNERSHIP_CARD_NONEDITABLE_PERCENTAGE_TITLE_PATH = "OwnershipCard.NonEditablePercentage.title";

export enum EditorOwnershipType {
    NONE,
    SINGLE,
    PERCENTAGE_OF_100,
    JOINT
}

export interface OwnershipCardNonEditablePercentageProps<T extends EntityFragment = EntityFragment>{
    form: FormInstance;
    initialValues?: T;
}

export const OwnershipCardNonEditablePercentage: React.FunctionComponent<OwnershipCardNonEditablePercentageProps> = ({
    form,
    initialValues
}) => {
    const intl = useIntl();
    const { setFieldsValue, getFieldValue } = form;
    const ownedBy = getFieldValue(OWNED_BY_PATH) || initialValues?.ownedBy;

    function getOwnedByPercentageOwnedPath(personId: string): Array<string| number>{
        let index = findIndex(ownedBy, (owner: OwnerFragment) => {
            return (owner?.Person as PersonFragment)?.id === personId;
        });
        if(index === -1){
            index = ownedBy.length - 1;
        }
        const getOwnedByPath = [OWNED_BY_PATH, index];
        const getOwnedByPercentageOwnedPath = [...getOwnedByPath, "percentageOwned"];
        return getOwnedByPercentageOwnedPath;
    }
    const handleOwnerClick=()=>{
        
    }
    return (
        <div>
        <Card 
            title={intl.formatMessage({ id: OWNERSHIP_CARD_NONEDITABLE_PERCENTAGE_TITLE_PATH })}
            bordered={false}>
            {
                initialValues?.ownedBy?.map((owner, index)=>(
                    <Fragment key={index}>
                        <Form.Item>
                            <Button type='text' onClick={handleOwnerClick}>
                                <MalipsTypography.Text>
                                    {owner.Person?.knownAs}
                                </MalipsTypography.Text>
                            </Button>
                        </Form.Item>
                        <MalipsInput.PercentageInput
                            name={[...getOwnedByPercentageOwnedPath(owner.Person?.id)]}
                            max={100}
                            style={{width: "250px"}}
                        />
                    </Fragment>))
            }
        </Card>
        </div>)
}