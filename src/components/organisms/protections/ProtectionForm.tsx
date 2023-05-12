import { useForm } from '../../../malips_hooks';
import { ProtectionFragment } from '../../constants/protectionConstants';
import { ProtectionTypeSection } from '../../molecules';
import {ClientFormTemplate} from "../../templates/";
import { ReactElement, useMemo } from 'react';
import {defaultsDeep, findIndex, get, set} from "lodash-es";
import { OwnedByFragment, OwnerFragment, PersonFragment } from '../../constants';

export const ProtectionFormAgePath: string = "Protection.Form.Age";
export const PROTECTION_OWNED_BY_PATH = "Protection.Form.ownedBy";

interface ProtectionFormProps{
  scenarioValues?: ProtectionFragment;
  baselineValues?: ProtectionFragment;
  onSubmit: (values: ProtectionFragment) => void;
}

export const ProtectionForm: React.FunctionComponent<ProtectionFormProps> =({
  scenarioValues,
  baselineValues,
  onSubmit
}): ReactElement =>
{
    const [form] = useForm();
    const { setFieldsValue, getFieldValue } = form;
    const intialOwnership: OwnedByFragment = [];

    const initialValues: ProtectionFragment = useMemo(()=>{
      const defaults = {};

      set(defaults, PROTECTION_OWNED_BY_PATH, intialOwnership);
      const output = scenarioValues ? defaultsDeep({}, scenarioValues, defaults) : defaults;

      return output;
    }, [scenarioValues, intialOwnership])
        
    
    return(
      <ClientFormTemplate id="protection"
        initialValues={initialValues}
        form={form}
        onSubmit={onSubmit}
      >
           <ProtectionTypeSection form={form} initialValues= {initialValues}/>
 
      </ClientFormTemplate>);
}