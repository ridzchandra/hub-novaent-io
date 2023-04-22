/** @format */

import { RDSDataService } from "aws-sdk";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDS } from "@serverless-stack/node/rds";

const db = new Kysely({
	dialect: new DataApiDialect({
		mode: "postgres",
		driver: {
			database: RDS.Cluster.defaultDatabaseName,
			secretArn: RDS.Cluster.secretArn,
			resourceArn: RDS.Cluster.clusterArn,
			client: new RDSDataService(),
		},
	}),
});

export const handler = async (event) => {
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

	return {
		statusCode: 200,
		headers: { "Content-Type": "application/json" },
		body: count,
	};
};
