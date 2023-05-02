/** @format */

import { getHitsAndIncrement } from "@latest-rest-postgres/core";

export async function handler() {
	const count = await getHitsAndIncrement();
	return {
		statusCode: 200,
		body: count,
	};
}
