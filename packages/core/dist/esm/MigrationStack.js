/** @format */
import { RDS } from "sst/constructs";
export function MigrationStack(_a) {
    var stack = _a.stack;
    // Create the Aurora DB cluster
    var cluster = new RDS(stack, "Cluster", {
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
        cluster: cluster,
    };
}
