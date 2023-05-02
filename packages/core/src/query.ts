/** @format */

import { db } from "./db.js";

export const getHitsAndIncrement = async () => {
	const record = await db
		.selectFrom("tblcounter")
		.select("tally")
		.where("counter", "=", "hits")
		.executeTakeFirstOrThrow();

	let count = record.tally;

	await db
		.updateTable("tblcounter")
		.set({
			tally: ++count,
		})
		.execute();

	return count;
};
