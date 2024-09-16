"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputFields = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default();
(0, ajv_formats_1.default)(ajv);
const schemas = {
    email: { type: 'string', format: 'email' },
    url: { type: 'string', format: 'uri' },
    uuid: { type: 'string', format: 'uuid' },
    date: { type: 'string', format: 'date' },
};
function validateInputFields(inputFields) {
    let isValid = true;
    let errors = [];
    inputFields.forEach((inputField) => {
        const { name, validationType, required, pattern, dateData, enumValues, stringData, numberData, booleanData, stringFormat, numberValidationType, minValue, maxValue, } = inputField;
        let valueToValidate;
        let isValidForType = true;
        let errorsForType = [];
        switch (validationType) {
            case 'string':
                valueToValidate = stringData || '';
                if (required && valueToValidate === '') {
                    isValidForType = false;
                    errorsForType.push({ field: name, message: 'String cannot be empty' });
                }
                else if (stringFormat === 'email' && !ajv.validate(schemas.email, valueToValidate)) {
                    isValidForType = false;
                    errorsForType.push({ field: name, message: 'Invalid email format' });
                }
                else if (stringFormat === 'url') {
                    if (required && valueToValidate === '') {
                        isValidForType = false;
                        errorsForType.push({ field: name, message: 'URL cannot be empty' });
                    }
                    else if (valueToValidate !== '' && !ajv.validate(schemas.url, valueToValidate)) {
                        isValidForType = false;
                        errorsForType.push({ field: name, message: 'Invalid URL format' });
                    }
                }
                else if (stringFormat === 'uuid') {
                    if (required && valueToValidate === '') {
                        isValidForType = false;
                        errorsForType.push({ field: name, message: 'UUID cannot be empty' });
                    }
                    else if (valueToValidate !== '' && !ajv.validate(schemas.uuid, valueToValidate)) {
                        isValidForType = false;
                        errorsForType.push({ field: name, message: 'Invalid UUID format' });
                    }
                }
                else if (stringFormat === 'pattern' && pattern) {
                    const regex = new RegExp(pattern);
                    if (!regex.test(valueToValidate)) {
                        isValidForType = false;
                        errorsForType.push({ field: name, message: `Value does not match pattern: ${pattern}` });
                    }
                }
                break;
            case 'number':
                valueToValidate = numberData;
                if (required && (valueToValidate === undefined || valueToValidate === null)) {
                    isValidForType = false;
                    errorsForType.push({ field: name, message: 'Value must be a number' });
                }
                else if (valueToValidate !== undefined && isNaN(valueToValidate)) {
                    isValidForType = false;
                    errorsForType.push({ field: name, message: 'Value must be a valid number' });
                }
                else {
                    switch (numberValidationType) {
                        case 'min':
                            if (minValue !== undefined && valueToValidate < minValue) {
                                isValidForType = false;
                                errorsForType.push({
                                    field: name,
                                    message: `Value must be greater than or equal to ${minValue}`,
                                });
                            }
                            break;
                        case 'max':
                            if (maxValue !== undefined && valueToValidate > maxValue) {
                                isValidForType = false;
                                errorsForType.push({
                                    field: name,
                                    message: `Value must be less than or equal to ${maxValue}`,
                                });
                            }
                            break;
                        case 'range':
                            if ((minValue !== undefined && valueToValidate < minValue) ||
                                (maxValue !== undefined && valueToValidate > maxValue)) {
                                isValidForType = false;
                                errorsForType.push({
                                    field: name,
                                    message: `Value must be between ${minValue} and ${maxValue}`,
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
                    errorsForType.push({ field: name, message: 'Value must be a boolean' });
                }
                break;
            case 'date':
                valueToValidate = dateData || '';
                if (required && valueToValidate === '') {
                    isValidForType = false;
                    errorsForType.push({ field: name, message: 'Date cannot be empty' });
                }
                else if (valueToValidate !== '' && !ajv.validate(schemas.date, valueToValidate)) {
                    isValidForType = false;
                    errorsForType.push({ field: name, message: 'Invalid date format' });
                }
                break;
            case 'enum':
                valueToValidate = stringData || '';
                const enumValuesArray = (enumValues || '').split(',').map((v) => v.trim());
                if (required && valueToValidate === '') {
                    isValidForType = false;
                    errorsForType.push({ field: name, message: 'Value cannot be empty' });
                }
                else if (valueToValidate !== '' && !enumValuesArray.includes(valueToValidate)) {
                    isValidForType = false;
                    errorsForType.push({ field: name, message: `Value must be one of: ${enumValuesArray.join(', ')}` });
                }
                break;
        }
        isValid = isValid && isValidForType;
        errors = errors.concat(errorsForType);
    });
    return { isValid, errors };
}
exports.validateInputFields = validateInputFields;
//# sourceMappingURL=validateInput.js.map