/** @format */

import { SSTConfig } from "sst";
import { ExampleStack } from "./stacks/ExampleStack";
import { MigrationStack } from "@latest-rest-postgres/core";

export default {
	config(_input) {
		return {
			name: "service4",
			region: "ap-southeast-2",
		};
	},
	stacks(app) {
		app.stack(MigrationStack).stack(ExampleStack);
	},
} satisfies SSTConfig;
