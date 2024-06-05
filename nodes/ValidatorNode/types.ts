export interface InputField {
	validationType: 'string' | 'number' | 'boolean' | 'date' | 'enum';
	required: boolean;
	stringData?: string;
	numberData?: number;
	booleanData?: boolean;
	dateData?: string;
	enumValues?: string;
	useRegex?: boolean;
	pattern?: string;
	stringFormat?: 'email' | 'url' | 'uuid' | 'pattern';
	numberValidationType?: 'none' | 'min' | 'max' | 'range';
	minValue?: number;
	maxValue?: number;
}
