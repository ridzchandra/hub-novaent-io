/** @format */

import { RDS, StackContext } from "sst/constructs";

export function MigrationStack({ stack }: StackContext) {
	// Create the Aurora DB cluster
	const cluster = new RDS(stack, "Cluster", {
		engine: "postgresql11.13",
		defaultDatabaseName: "CounterDB",
		// TODO:
		// Find a way to bring the migrations to lambda's context in bundling instead of referring to the location in this package
		migrations: "../../packages/domain/migrations",
	});

	// Show the resource info in the output
	stack.addOutputs({
		SecretArn: cluster.secretArn,
		ClusterIdentifier: cluster.clusterIdentifier,
	});

	return {
		cluster,
	};
}
