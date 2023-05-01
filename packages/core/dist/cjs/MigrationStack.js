"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationStack = void 0;
var constructs_1 = require("sst/constructs");
function MigrationStack(_a) {
    // const script = new Script(stack, "migrationScript", {
    // 	onCreate: {
    // 		handler: "services/functions/migrate.handler",
    // 		copyFiles: [
    // 			{
    // 				from: "../../packages/core/migrations",
    // 				to: "services/migrations",
    // 			},
    // 		],
    // 	},
    // 	onUpdate: {
    // 		handler: "services/functions/migrate.handler",
    // 		copyFiles: [
    // 			{
    // 				from: "../../packages/core/migrations",
    // 				to: "services/migrations",
    // 			},
    // 		],
    // 	},
    // });
    var stack = _a.stack;
    // Create the Aurora DB cluster
    var cluster = new constructs_1.RDS(stack, "Cluster", {
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
        // script,
    };
}
exports.MigrationStack = MigrationStack;
