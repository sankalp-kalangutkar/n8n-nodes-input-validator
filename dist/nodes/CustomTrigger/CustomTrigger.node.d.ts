import { INodeType, INodeTypeDescription, ITriggerFunctions, ITriggerResponse, IWebhookFunctions, IWebhookResponseData } from 'n8n-workflow';
export declare class CustomTrigger implements INodeType {
    description: INodeTypeDescription;
    webhook(this: IWebhookFunctions): Promise<IWebhookResponseData>;
    trigger(this: ITriggerFunctions): Promise<ITriggerResponse>;
}
