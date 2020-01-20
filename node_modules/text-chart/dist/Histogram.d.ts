import { HistogramProperties } from "./interfaces";
import TextChart from "./TextChart";
export default class Histogram extends TextChart {
    private data;
    setData(data: number[]): this;
    setProperties(histogramProperties: HistogramProperties): Histogram;
    render(): string;
}
