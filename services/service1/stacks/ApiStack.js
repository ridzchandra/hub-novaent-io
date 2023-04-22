/** @format */

import { Api, use } from "@serverless-stack/resources";
import { MigrateStack } from "./MigrateStack";

export function ApiStack({ stack }) {
	const { cluster } = use(MigrateStack);
	const api = new Api(stack, "api", {
		defaults: {
			function: {
				bind: [cluster],
			},
		},
		routes: {
			"GET /": "/lambda.handler",
		},
	});
	stack.addOutputs({
		ApiEndpoint: api.url,
	});
}
