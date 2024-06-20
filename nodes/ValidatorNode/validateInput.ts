import { URL } from 'url';
import Ajv from 'ajv';
import { InputField } from './types';
import { schemas } from './schemas';

const ajv = new Ajv();

ajv.addFormat('date-time', {
	validate: (dateString: string) => !isNaN(Date.parse(dateString)),
});

ajv.addFormat('email', {
	type: 'string',
	validate: (email: string) => /\S+@\S+\.\S+/.test(email),
});

ajv.addFormat('url', {
	type: 'string',
	validate: (url: string) => {
		try {
			new URL(url);
			return true;
		} catch (_) {
			return false;
		}
	},
});

ajv.addFormat('uuid', {
	validate: (uuid: string) => {
		const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		return uuidRegex.test(uuid);
	},
});

export function validateInputFields(inputFields: InputField[]) {
    let isValid = true;
    let errors: { message: string }[] = [];

    inputFields.forEach((inputField) => {
        const {
            name, // Get the name of the validation
            validationType,
            required,
            useRegex,
            pattern,
            dateData,
            enumValues,
            stringData,
            numberData,
            booleanData,
            stringFormat,
            numberValidationType,
            minValue,
            maxValue,
        } = inputField;

        let valueToValidate: any;
        let isValidForType = true;
        let errorsForType: { message: string }[] = [];

        switch (validationType) {
            case 'string':
                valueToValidate = stringData || '';
                if (required && valueToValidate === '') {
                    isValidForType = false;
                    errorsForType.push({ message: `${name}: String cannot be empty` });
                } else if (stringFormat === 'email' && !ajv.validate(schemas.email, valueToValidate)) {
                    isValidForType = false;
                    errorsForType.push({ message: `${name}: Invalid email format` });
                } else if (stringFormat === 'url') {
                    if (required && valueToValidate === '') {
                        isValidForType = false;
                        errorsForType.push({ message: `${name}: URL cannot be empty` });
                    } else if (valueToValidate !== '' && !ajv.validate(schemas.url, valueToValidate)) {
                        isValidForType = false;
                        errorsForType.push({ message: `${name}: Invalid URL format` });
                    }
                } else if (stringFormat === 'uuid') {
                    if (required && valueToValidate === '') {
                        isValidForType = false;
                        errorsForType.push({ message: `${name}: UUID cannot be empty` });
                    } else if (valueToValidate !== '' && !ajv.validate(schemas.uuid, valueToValidate)) {
                        isValidForType = false;
                        errorsForType.push({ message: `${name}: Invalid UUID format` });
                    }
                } else if (stringFormat === 'pattern' && useRegex && pattern) {
                    const regex = new RegExp(pattern);
                    if (!regex.test(valueToValidate)) {
                        isValidForType = false;
                        errorsForType.push({ message: `${name}: Value does not match pattern: ${pattern}` });
                    }
                }
                break;

            case 'number':
                valueToValidate = numberData;
                if (required && (valueToValidate === undefined || valueToValidate === null)) {
                    isValidForType = false;
                    errorsForType.push({ message: `${name}: Value must be a number` });
                } else if (valueToValidate !== undefined && isNaN(valueToValidate)) {
                    isValidForType = false;
                    errorsForType.push({ message: `${name}: Value must be a valid number` });
                } else {
                    switch (numberValidationType) {
                        case 'min':
                            if (minValue !== undefined && valueToValidate < minValue) {
                                isValidForType = false;
                                errorsForType.push({
                                    message: `${name}: Value must be greater than or equal to ${minValue}`,
                                });
                            }
                            break;
                        case 'max':
                            if (maxValue !== undefined && valueToValidate > maxValue) {
                                isValidForType = false;
                                errorsForType.push({ message: `${name}: Value must be less than or equal to ${maxValue}` });
                            }
                            break;
                        case 'range':
                            if (
                                (minValue !== undefined && valueToValidate < minValue) ||
                                (maxValue !== undefined && valueToValidate > maxValue)
                            ) {
                                isValidForType = false;
                                errorsForType.push({
                                    message: `${name}: Value must be between ${minValue} and ${maxValue}`,
                                });
                            }
                            break;
                    }
                }
                break;

            case 'boolean':
                valueToValidate = booleanData;
                if (required && valueToValidate === undefined) {
                    isValidForType = false;
                    errorsForType.push({ message: `${name}: Value must be a boolean` });
                }
                break;

            case 'date':
                valueToValidate = dateData || '';
                if (required && valueToValidate === '') {
                    isValidForType = false;
                    errorsForType.push({ message: `${name}: Date cannot be empty` });
                } else if (valueToValidate !== '' && !ajv.validate(schemas.date, valueToValidate)) {
                    isValidForType = false;
                    errorsForType.push({ message: `${name}: Invalid date format` });
                }
                break;

            case 'enum':
                valueToValidate = stringData || '';
                const enumValuesArray = (enumValues || '').split(',').map((v) => v.trim());
                if (required && valueToValidate === '') {
                    isValidForType = false;
                    errorsForType.push({ message: `${name}: Value cannot be empty` });
                } else if (valueToValidate !== '' && !enumValuesArray.includes(valueToValidate)) {
                    isValidForType = false;
                    errorsForType.push({ message: `${name}: Value must be one of: ${enumValuesArray.join(', ')}` });
                }
                break;
        }

        isValid = isValid && isValidForType;
        errors = errors.concat(errorsForType);
    });

    return { isValid, errors };
}



