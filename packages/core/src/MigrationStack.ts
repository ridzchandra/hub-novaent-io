/** @format */

import { RDS, StackContext } from "sst/constructs";

export function MigrationStack({ stack }: StackContext) {
	// Create the Aurora DB cluster
	const cluster = new RDS(stack, "Cluster", {
		engine: "postgresql11.13",
		defaultDatabaseName: "CounterDB",
		migrations: "../../packages/core/migrations",
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
