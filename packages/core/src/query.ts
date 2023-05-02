/** @format */

import { Kysely } from "kysely";
import { DatabaseSchema } from "./schema";

export const getHitsAndIncrement = async (db: Kysely<DatabaseSchema>) => {
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
