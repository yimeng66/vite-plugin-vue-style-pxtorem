'use strict';

var pluginutils = require('@rollup/pluginutils');

const pxRegex = /(\d+(\.\d+)?)px/g;
function toFixed(number, precision) {
    const multiplier = Math.pow(10, precision + 1), wholeNumber = Math.floor(number * multiplier);
    return (Math.round(wholeNumber / 10) * 10) / multiplier;
}
function createPxReplace(rootValue, unitPrecision, minPixelValue) {
    return (m, $1) => {
        if (!$1)
            return m;
        const pixels = parseFloat($1);
        if (pixels < minPixelValue)
            return m;
        const fixedVal = toFixed(pixels / rootValue, unitPrecision);
        return fixedVal === 0 ? "0" : fixedVal + "rem";
    };
}
function px2RemPlugin(opt) {
    const options = Object.assign({
        rootValue: 16,
        unitPrecision: 5,
        minPixelValue: 0,
    }, opt);
    const filter = pluginutils.createFilter(/\.vue$/, opt === null || opt === void 0 ? void 0 : opt.exclude);
    return {
        name: "style-pxtorem",
        transform(code, id) {
            if (filter(id) && pxRegex.test(code)) {
                const { rootValue, unitPrecision, minPixelValue } = options;
                return code.replace(pxRegex, createPxReplace(rootValue, unitPrecision, minPixelValue));
            }
        },
    };
}

module.exports = px2RemPlugin;
