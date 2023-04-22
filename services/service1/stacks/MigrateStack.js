/** @format */

import { RDS } from "@serverless-stack/resources";

export function MigrateStack({ stack }) {
	const DB_NAME = "HubDB";

	// Create the Aurora DB cluster
	const cluster = new RDS(stack, "Cluster", {
		engine: "postgresql11.13",
		defaultDatabaseName: DB_NAME,
		migrations: "migrations",
	});

	// Show the cluster's secret arn, resource arn and cluster's identifier in the output
	stack.addOutputs({
		SecretArn: cluster.secretArn,
		ResourceArn: cluster.clusterArn,
		ClusterIdentifier: cluster.clusterIdentifier,
	});

	// Return the cluster resource
	return { cluster };
}
