/** @format */

import { Api } from "@serverless-stack/resources";

export function MyStack({ stack }) {
	const api = new Api(stack, "api", {
		routes: {
			"GET /": "/lambda.handler",
		},
	});
	stack.addOutputs({
		ApiEndpoint: api.url,
	});
}
