import { EntityTypes } from "../../constants";

export function getInitialOwnership(entityType : EntityTypes, ){
    switch(entityType){
        case EntityTypes.PROTECTION:
        return 1;
    }
}