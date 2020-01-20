import { ChartProperties } from "./interfaces";
export declare function generateBarChartFromScaledData(scaledData: Array<[string, number, number]>, maxLabelLength: number, chartProperties: ChartProperties): string;
export declare function generateBarChartFromData(data: Array<[string, number]>, maxLabelLength: number, chartProperties: ChartProperties): string;
export declare function roundToDecimalPlace(num: number, precision: number): number;
export declare function isInteger(value: any): boolean;
export declare function log10(value: number): number;
