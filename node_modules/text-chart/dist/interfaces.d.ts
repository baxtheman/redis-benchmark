export declare enum ChartType {
    Bar = "bar",
    Histogram = "histogram"
}
export declare enum BarCharacters {
    LightShade = "\u2591",
    MediumShade = "\u2592",
    DarkShade = "\u2593",
    BlackSquare = "\u25A0",
    WhiteSquare = "\u25A1",
    BlackRectangle = "\u25AE",
    WhiteRectangle = "\u25AF",
    HorizontalFillSquare = "\u25A4",
    VerticalFillSquare = "\u25A5",
    OrthogonalCrosshatchFillSquare = "\u25A6",
    UpperLeftToLowerRightFillSquare = "\u25A7",
    UpperRightToLowerLeftFillSquare = "\u25A8",
    DiagonalCrosshatchFillSquare = "\u25A9"
}
export interface ChartProperties {
    barCharacter?: string | BarCharacters;
    width?: number;
}
export interface HistogramProperties extends ChartProperties {
    interval?: number;
    min?: number;
    max?: number;
}
