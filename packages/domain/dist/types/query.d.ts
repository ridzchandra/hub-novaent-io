/** @format */
import { Kysely } from "kysely";
import { DatabaseSchema } from "./schema";
export declare const getHitsAndIncrement: (db: Kysely<DatabaseSchema>) => Promise<number>;
