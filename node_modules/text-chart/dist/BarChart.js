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
var BarChart = /** @class */ (function (_super) {
    __extends(BarChart, _super);
    function BarChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = [];
        return _this;
    }
    BarChart.prototype.setData = function (data) {
        this.data = data;
        return this;
    };
    BarChart.prototype.setProperties = function (chartProperties) {
        _super.prototype.setProperties.call(this, chartProperties);
        return this;
    };
    BarChart.prototype.render = function () {
        if (!this.data || this.data.length === 0) {
            throw new Error("Couldn't render bar chart because no data has been set for it!");
        }
        var chartProperties = this.getProperties();
        var maxLabelLength = 0;
        var maxAbsoluteValue = 0;
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var _b = _a[_i], label = _b[0], value = _b[1];
            var labelLength = label.length;
            maxLabelLength = Math.max(maxLabelLength, labelLength);
            maxAbsoluteValue = Math.max(Math.abs(value), maxAbsoluteValue);
        }
        if (chartProperties.width && maxAbsoluteValue > chartProperties.width) {
            var scaleDownFactor_1 = chartProperties.width / maxAbsoluteValue;
            // scaled data point: label, original value, scaled value
            var scaledData = this.data
                .map(function (_a) {
                var label = _a[0], value = _a[1];
                return [label, value, Math.round(scaleDownFactor_1 * value)];
            });
            return lib_1.generateBarChartFromScaledData(scaledData, maxLabelLength, chartProperties);
        }
        return lib_1.generateBarChartFromData(this.data, maxLabelLength, chartProperties);
    };
    return BarChart;
}(TextChart_1.default));
exports.default = BarChart;
