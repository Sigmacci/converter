import { Rate } from "./rate";

export interface Table {
    table: string;
    no: string;
    effectiveDate: string;
    rates: Rate[];
}