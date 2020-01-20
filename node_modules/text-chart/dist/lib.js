"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateBarChartFromScaledData(scaledData, maxLabelLength, chartProperties) {
    var chart = "";
    scaledData.forEach(function (_a, index) {
        var label = _a[0], originalValue = _a[1], scaledValue = _a[2];
        var row = label;
        while (row.length < maxLabelLength) {
            row = " " + row;
        }
        var bars = "";
        while (bars.length < scaledValue) {
            bars += chartProperties.barCharacter;
        }
        chart +=
            index !== scaledData.length - 1
                ? row + " | " + bars + " " + originalValue + "\n"
                : row + " | " + bars + " " + originalValue;
    });
    return chart;
}
exports.generateBarChartFromScaledData = generateBarChartFromScaledData;
function generateBarChartFromData(data, maxLabelLength, chartProperties) {
    var chart = "";
    data.forEach(function (_a, index) {
        var label = _a[0], value = _a[1];
        var row = label;
        while (row.length < maxLabelLength) {
            row = " " + row;
        }
        var bars = "";
        while (bars.length < value) {
            bars += chartProperties.barCharacter;
        }
        chart +=
            index !== data.length - 1
                ? row + " | " + bars + " " + value + "\n"
                : row + " | " + bars + " " + value;
    });
    return chart;
}
exports.generateBarChartFromData = generateBarChartFromData;
function roundToDecimalPlace(num, precision) {
    return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
}
exports.roundToDecimalPlace = roundToDecimalPlace;
function isInteger(value) {
    return (typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value);
}
exports.isInteger = isInteger;
function log10(value) {
    return Math.log(value) / Math.log(10);
}
exports.log10 = log10;
