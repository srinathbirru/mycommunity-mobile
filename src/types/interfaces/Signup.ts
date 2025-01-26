// import { DocumentPickerResponse } from "react-native-document-picker";

export interface DropdownOptions {
    label: string,
    value: string
}

export interface formValues {
    community: null | string
    firstName: string
    lastName: string
    mobile: string
    email: string
    password: string
    houseNumber: null | string
    // addressProofDoc: DocumentPickerResponse | null
}