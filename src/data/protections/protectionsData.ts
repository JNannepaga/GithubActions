import { JurisdictionType, LocationType, ProtectionType, ProtectionFragment } from "../../components/constants";

export const ProtectionsInitialValues: ProtectionFragment = {
    clientId: "1",
    scenarioId: "1",
    entityId: "1",
    isExcluded: false,
    notes: "Hey I'm Notes.",
    description: "Term Desc",
    policyType: ProtectionType.TERM,
    startYear: 2012,
    endYear: 2050,
    ownedBy: [
      { 
        Person: {
          id: "1",
          Jurisdiction: JurisdictionType.UK,
          Location: LocationType.LiverPool,
          knownAs: "Adam",
          name: "Adam Reeves",
        },
        PercentageOwned: 50
      },
      { 
        Person: {
          id: "2",
          Jurisdiction: JurisdictionType.UK,
          Location: LocationType.LiverPool,
          knownAs: "Eve",
          name: "Eve Reeves",
        },
        PercentageOwned: 50
      }
    ]
};
