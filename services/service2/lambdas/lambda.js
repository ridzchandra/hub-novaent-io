/** @format */

export const handler = async (event) => {
	return {
		statusCode: 200,
		headers: { "Content-Type": "text/plain" },
		body: `Hello World! Via service2 at ${event.requestContext.time}.`,
	};
};
