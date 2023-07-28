import { Rate } from "./rate";

export interface Table {
    table: string;
    no: string;
    effectiveDate: Date;
    rates: Rate[];
}