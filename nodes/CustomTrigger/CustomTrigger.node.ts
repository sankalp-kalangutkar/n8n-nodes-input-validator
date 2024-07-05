import {
	INodeType,
	INodeTypeDescription,
	ITriggerFunctions,
	ITriggerResponse,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';

export class CustomTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Custom Trigger',
		name: 'customTrigger',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when a POST request is received',
		defaults: {
			name: 'Custom Trigger',
			color: '#1A82E2',
		},
		inputs: [],
		outputs: ['main'],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'custom-webhook',
			},
		],
		properties: [],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const res = this.getResponseObject();

		if (req.method === 'POST') {
			const data = req.body;

			// Send response to the requester
			res.json({ success: true });

			return {
				workflowData: [this.helpers.returnJsonArray([data])],
			};
		} else {
			res.status(405).send('Method Not Allowed');
			return {
				workflowData: [],
			};
		}
	}

	async trigger(this: ITriggerFunctions): Promise<ITriggerResponse> {
		// Returning an empty close function because n8n handles webhook registration automatically
		return {
			closeFunction: async () => {},
		};
	}
}
