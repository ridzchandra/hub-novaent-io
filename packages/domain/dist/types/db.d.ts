/** @format */
import { Kysely } from "kysely";
interface Database {
    tblcounter: {
        counter: string;
        tally: number;
    };
}
export declare const db: Kysely<Database>;
export {};
