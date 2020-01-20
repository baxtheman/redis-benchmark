import { ChartProperties } from "./interfaces";
import TextChart from "./TextChart";
export default class BarChart extends TextChart {
    private data;
    setData(data: Array<[string, number]>): BarChart;
    setProperties(chartProperties: ChartProperties): BarChart;
    render(): string;
}
