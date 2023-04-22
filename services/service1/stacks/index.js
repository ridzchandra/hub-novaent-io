/** @format */

import { ApiStack } from "./ApiStack";
import { MigrateStack } from "./MigrateStack";
import { App } from "@serverless-stack/resources";

/**
 * @param {App} app
 */
export default function (app) {
	app.setDefaultFunctionProps({
		runtime: "nodejs16.x",
		srcPath: "lambdas",
		bundle: {
			format: "esm",
		},
	});
	app.stack(MigrateStack).stack(ApiStack);
}
