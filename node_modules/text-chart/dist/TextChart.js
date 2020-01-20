"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
var TextChart = /** @class */ (function () {
    function TextChart(properties) {
        this.properties = {
            barCharacter: TextChart.DefaultBarCharacter
        };
        if (properties) {
            this.properties = __assign({}, this.properties, properties);
        }
    }
    TextChart.prototype.getProperties = function () {
        return this.properties;
    };
    TextChart.prototype.setProperties = function (properties) {
        this.properties = __assign({}, this.properties, properties);
    };
    TextChart.DefaultBarCharacter = interfaces_1.BarCharacters.BlackSquare;
    return TextChart;
}());
exports.default = TextChart;
