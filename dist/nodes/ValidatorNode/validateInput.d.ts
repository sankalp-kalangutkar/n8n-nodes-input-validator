import { InputField } from './types';
export declare function validateInputFields(inputFields: InputField[]): {
    isValid: boolean;
    errors: {
        field: string;
        message: string;
    }[];
};
