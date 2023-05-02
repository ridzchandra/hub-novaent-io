"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var kysely_1 = require("kysely");
var kysely_data_api_1 = require("kysely-data-api");
var client_rds_data_1 = require("@aws-sdk/client-rds-data");
var rds_1 = require("sst/node/rds");
exports.db = new kysely_1.Kysely({
    dialect: new kysely_data_api_1.DataApiDialect({
        mode: "postgres",
        driver: {
            database: rds_1.RDS.Cluster.defaultDatabaseName,
            secretArn: rds_1.RDS.Cluster.secretArn,
            resourceArn: rds_1.RDS.Cluster.clusterArn,
            client: new client_rds_data_1.RDSData({}),
        },
    }),
});
