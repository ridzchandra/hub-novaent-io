/** @format */

import { SSTConfig } from "sst";
import { ExampleStack } from "./stacks/ExampleStack";

export default {
	config(_input) {
		return {
			name: "latest-rest-postgres",
			region: "ap-southeast-2",
		};
	},
	stacks(app) {
		app.stack(ExampleStack);
	},
} satisfies SSTConfig;
