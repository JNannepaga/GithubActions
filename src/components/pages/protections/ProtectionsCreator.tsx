import { EditorContextProvider } from "../../providers"
import { ProtectionForm } from "../../organisms/protections/ProtectionForm"
import { ProtectionsInitialValues } from '../../../data';
import { EditorContextValues } from "../../../contexts";
import { ProtectionFragment } from "../../constants";

export const ProtectionsCreator = () => {
    const editorContextValues: EditorContextValues = {
        actionName: "Add",
        entityTitle: "Protection"
      }
      
      
    function onSubmit(values: ProtectionFragment): void {
      console.log(values);
    }
    
    return(<EditorContextProvider value={editorContextValues}>
            <ProtectionForm
              onSubmit={onSubmit} 
              scenarioValues={ProtectionsInitialValues}
              baselineValues={ProtectionsInitialValues}/>
        </EditorContextProvider>)
}