/** @format */

import { sample } from "sample";
import util from "../../shared";

export const handler = async (event) => {
	return {
		statusCode: 200,
		headers: { "Content-Type": "text/plain" },
		body: `Hello World! Via ${sample()} and ${util()} at ${
			event.requestContext.time
		}.`,
	};
};
