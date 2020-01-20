import { ChartProperties } from "./interfaces";
export default abstract class TextChart {
    static DefaultBarCharacter: string;
    private properties;
    constructor(properties: ChartProperties | void);
    getProperties(): ChartProperties;
    setProperties(properties: ChartProperties): void;
    abstract render(): string;
}
