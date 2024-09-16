"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorNode = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const validateInput_1 = require("./validateInput");
class ValidatorNode {
    constructor() {
        this.description = {
            displayName: 'Validator Node',
            name: 'validatorNode',
            group: ['function'],
            version: 1,
            description: 'Validates input data against specified criteria',
            defaults: {
                name: 'Validator Node',
            },
            icon: 'file:validation.svg',
            inputs: ['main'],
            outputs: ['main'],
            properties: [
                {
                    displayName: 'Node Mode',
                    name: 'nodeMode',
                    type: 'options',
                    options: [
                        {
                            name: 'Output Validation Results',
                            value: 'output-validation',
                            description: 'Node will output validation results'
                        },
                        {
                            name: 'Output Items',
                            value: 'output-items',
                            description: 'Node will output items from input and error on validation failure'
                        }
                    ],
                    default: 'output-validation',
                },
                {
                    displayName: 'Inputs',
                    name: 'inputs',
                    type: 'fixedCollection',
                    default: {},
                    placeholder: 'Add Input',
                    typeOptions: {
                        multipleValues: true,
                    },
                    options: [
                        {
                            name: 'inputFields',
                            displayName: 'Input Fields',
                            values: [
                                {
                                    displayName: 'Validation Name',
                                    name: 'name',
                                    type: 'string',
                                    default: '',
                                    placeholder: 'Enter validation name',
                                    description: 'Name of the validation',
                                },
                                {
                                    displayName: 'Validation Type',
                                    name: 'validationType',
                                    type: 'options',
                                    options: [
                                        { name: 'Boolean', value: 'boolean' },
                                        { name: 'Date', value: 'date' },
                                        { name: 'Enum', value: 'enum' },
                                        { name: 'Number', value: 'number' },
                                        { name: 'String', value: 'string' },
                                    ],
                                    default: 'string',
                                    description: 'The type of validation to perform',
                                },
                                {
                                    displayName: 'Required',
                                    name: 'required',
                                    type: 'boolean',
                                    default: false,
                                    description: 'Whether the input field is required',
                                },
                                {
                                    displayName: 'String Data',
                                    name: 'stringData',
                                    type: 'string',
                                    default: '',
                                    placeholder: 'Enter string data',
                                    description: 'Data to be validated as a string',
                                    displayOptions: {
                                        show: {
                                            validationType: ['string', 'enum'],
                                        },
                                    },
                                },
                                {
                                    displayName: 'String Format',
                                    name: 'stringFormat',
                                    type: 'options',
                                    options: [
                                        { name: 'Email', value: 'email' },
                                        { name: 'None', value: 'none' },
                                        { name: 'Pattern', value: 'pattern' },
                                        { name: 'URL', value: 'url' },
                                        { name: 'UUID', value: 'uuid' },
                                    ],
                                    default: 'none',
                                    description: 'Specify if the string should be validated as an email, URL, UUID, or match a custom pattern',
                                    displayOptions: {
                                        show: {
                                            validationType: ['string'],
                                        },
                                    },
                                },
                                {
                                    displayName: 'Number Data',
                                    name: 'numberData',
                                    type: 'number',
                                    default: 0,
                                    placeholder: 'Enter number data',
                                    description: 'Data to be validated as a number',
                                    displayOptions: {
                                        show: {
                                            validationType: ['number'],
                                        },
                                    },
                                },
                                {
                                    displayName: 'Number Validation Type',
                                    name: 'numberValidationType',
                                    type: 'options',
                                    options: [
                                        { name: 'None', value: 'none' },
                                        { name: 'Minimum', value: 'min' },
                                        { name: 'Maximum', value: 'max' },
                                        { name: 'Range', value: 'range' },
                                    ],
                                    default: 'none',
                                    description: 'Specify if the number should be validated with minimum, maximum, or range',
                                    displayOptions: {
                                        show: {
                                            validationType: ['number'],
                                        },
                                    },
                                },
                                {
                                    displayName: 'Min Value',
                                    name: 'minValue',
                                    type: 'number',
                                    default: undefined,
                                    placeholder: 'Enter minimum value',
                                    description: 'Minimum value for number validation',
                                    displayOptions: {
                                        show: {
                                            validationType: ['number'],
                                            numberValidationType: ['min', 'range'],
                                        },
                                    },
                                },
                                {
                                    displayName: 'Max Value',
                                    name: 'maxValue',
                                    type: 'number',
                                    default: undefined,
                                    placeholder: 'Enter maximum value',
                                    description: 'Maximum value for number validation',
                                    displayOptions: {
                                        show: {
                                            validationType: ['number'],
                                            numberValidationType: ['max', 'range'],
                                        },
                                    },
                                },
                                {
                                    displayName: 'Boolean Data',
                                    name: 'booleanData',
                                    type: 'boolean',
                                    default: false,
                                    description: 'Whether Data to be validated as a boolean',
                                    displayOptions: {
                                        show: {
                                            validationType: ['boolean'],
                                        },
                                    },
                                },
                                {
                                    displayName: 'Date Data',
                                    name: 'dateData',
                                    type: 'string',
                                    default: '',
                                    placeholder: 'Enter date data',
                                    description: 'Data to be validated as a date',
                                    displayOptions: {
                                        show: {
                                            validationType: ['date'],
                                        },
                                    },
                                },
                                {
                                    displayName: 'Enum Values',
                                    name: 'enumValues',
                                    type: 'string',
                                    default: '',
                                    placeholder: 'Enter comma-separated enum values',
                                    description: 'Comma-separated list of valid enum values',
                                    displayOptions: {
                                        show: {
                                            validationType: ['enum'],
                                        },
                                    },
                                },
                                {
                                    displayName: 'Pattern',
                                    name: 'pattern',
                                    type: 'string',
                                    default: '',
                                    placeholder: 'Enter regex pattern',
                                    description: 'Regex pattern for validation',
                                    displayOptions: {
                                        show: {
                                            stringFormat: ['pattern'],
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const outputMode = this.getNodeParameter('nodeMode', 0);
        const returnData = [];
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            const item = items[itemIndex];
            const inputFields = this.getNodeParameter('inputs.inputFields', itemIndex, []);
            const { isValid, errors } = (0, validateInput_1.validateInputFields)(inputFields);
            if (outputMode === 'output-items') {
                if (isValid) {
                    returnData.push(item);
                }
                else {
                    let errorOutput = '';
                    for (let i = 0; i < errors.length; i++) {
                        if (errorOutput) {
                            errorOutput += ' | ';
                        }
                        errorOutput += `${errors[i].field}: ${errors[i].message}`;
                    }
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Item failed validation. ${errorOutput}`);
                }
            }
            else {
                item.json = {
                    isValid,
                    errors: errors.length ? errors : undefined,
                };
                returnData.push(item);
            }
        }
        return this.prepareOutputData(returnData);
    }
}
exports.ValidatorNode = ValidatorNode;
//# sourceMappingURL=ValidatorNode.node.js.map