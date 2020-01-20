"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib");
var TextChart_1 = __importDefault(require("./TextChart"));
var Histogram = /** @class */ (function (_super) {
    __extends(Histogram, _super);
    function Histogram() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = [];
        return _this;
    }
    Histogram.prototype.setData = function (data) {
        this.data = data;
        return this;
    };
    Histogram.prototype.setProperties = function (histogramProperties) {
        _super.prototype.setProperties.call(this, histogramProperties);
        return this;
    };
    Histogram.prototype.render = function () {
        if (!this.data || this.data.length === 0) {
            throw new Error("Couldn't render histogram because no data has been set for it!");
        }
        var chartProperties = this.getProperties();
        // Use != null comparison because number variable might be defined as 0, which is falsey.
        var min = chartProperties.min != null
            ? chartProperties.min
            : Math.min.apply(Math, this.data);
        var max = chartProperties.max != null
            ? chartProperties.max
            : Math.max.apply(Math, this.data);
        var numberOfBins = 0;
        var interval = 0;
        if (chartProperties.interval != null) {
            interval = chartProperties.interval;
            numberOfBins = Math.ceil((max - min) / interval);
        }
        else {
            numberOfBins = 10;
            interval = (max - min) / numberOfBins;
        }
        var bins = [];
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var value = _a[_i];
            var binIndex = 0;
            if (interval > 0) {
                binIndex = Math.floor((value - min) / interval);
                if (binIndex === numberOfBins) {
                    // If value === max
                    binIndex--;
                }
            }
            if (!bins[binIndex]) {
                bins[binIndex] = 0;
            }
            bins[binIndex]++;
        }
        for (var i = 0; i < numberOfBins; ++i) {
            if (bins[i] === undefined) {
                bins[i] = 0;
            }
        }
        var labels = [];
        var lower = min;
        var upper = 0;
        // todo: skip label calculations if interval/min/max is given
        for (var i = 0; i < numberOfBins; ++i) {
            upper = lower + interval;
            if (interval > 1 && !lib_1.isInteger(interval)) {
                labels[i] = lib_1.roundToDecimalPlace(lower, 2) + " - " + lib_1.roundToDecimalPlace(upper, 2);
            }
            else if (interval < 1) {
                // eg: if scale is 0.01 - 0.099..., log10 yields -2.
                // precision is abs(-2) + 1 = 3 decimal places
                var scale = Math.floor(lib_1.log10(interval)); // Negative
                var precision = Math.abs(scale) + 1;
                labels[i] = lib_1.roundToDecimalPlace(lower, precision) + " - " + lib_1.roundToDecimalPlace(upper, precision);
            }
            else {
                labels[i] = lower + " - " + upper;
            }
            lower = upper;
        }
        var graphData = [];
        // Merge labels with bins
        labels.forEach(function (label, index) {
            graphData.push([label, bins[index]]);
        });
        var maxLabelLength = 0;
        var maxAbsoluteValue = 0;
        for (var _b = 0, graphData_1 = graphData; _b < graphData_1.length; _b++) {
            var _c = graphData_1[_b], label = _c[0], value = _c[1];
            var labelLength = label.length;
            maxLabelLength = Math.max(maxLabelLength, labelLength);
            maxAbsoluteValue = Math.max(Math.abs(value), maxAbsoluteValue);
        }
        if (chartProperties.width && maxAbsoluteValue > chartProperties.width) {
            var scaleDownFactor_1 = chartProperties.width / maxAbsoluteValue;
            // scaled data point: label, original value, scaled value
            var scaledData = graphData.map(function (_a) {
                var label = _a[0], value = _a[1];
                return [label, value, Math.round(scaleDownFactor_1 * value)];
            });
            return lib_1.generateBarChartFromScaledData(scaledData, maxLabelLength, chartProperties);
        }
        return lib_1.generateBarChartFromData(graphData, maxLabelLength, chartProperties);
    };
    return Histogram;
}(TextChart_1.default));
exports.default = Histogram;
