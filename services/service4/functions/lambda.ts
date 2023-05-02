/** @format */

import {
	DatabaseSchema,
	getHitsAndIncrement,
} from "@latest-rest-postgres/core";
import { Kysely } from "kysely";
import { DataApiDialect } from "kysely-data-api";
import { RDSData } from "@aws-sdk/client-rds-data";
import { RDS } from "sst/node/rds";

export const db = new Kysely<DatabaseSchema>({
	dialect: new DataApiDialect({
		mode: "postgres",
		driver: {
			database: RDS.Cluster.defaultDatabaseName,
			secretArn: RDS.Cluster.secretArn,
			resourceArn: RDS.Cluster.clusterArn,
			client: new RDSData({}),
		},
	}),
});

export async function handler() {
	const count = await getHitsAndIncrement(db);

	return {
		statusCode: 200,
		body: count,
		// body: 1,
	};
}
