import { InputField } from './types';
export declare function validateInputFields(inputFields: InputField[]): {
    isValid: boolean;
    errors: {
        message: string;
    }[];
};
