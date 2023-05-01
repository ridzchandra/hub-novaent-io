/** @format */

import { MigrationStack } from "@latest-rest-postgres/core";
import { Api, use, StackContext } from "sst/constructs";

export function ExampleStack({ stack }: StackContext) {
	const { cluster } = use(MigrationStack);

	// Create a HTTP API
	const api = new Api(stack, "Api", {
		defaults: {
			function: {
				bind: [cluster],
			},
		},
		routes: {
			"POST /": "services/functions/lambda.handler",
		},
	});

	// Show the resource info in the output
	stack.addOutputs({
		ApiEndpoint: api.url,
	});
}
