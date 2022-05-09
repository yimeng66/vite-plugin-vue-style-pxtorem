import { Plugin } from "vite";
import { createFilter } from "@rollup/pluginutils";

export interface Options {
  rootValue: number;
  unitPrecision: number;
  minPixelValue?: number;
  exclude?: [];
}

const pxRegex = /(\d+(\.\d+)?)px/g;

function toFixed(number: number, precision: number) {
  const multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier);
  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}

function createPxReplace(
  rootValue: number,
  unitPrecision: number,
  minPixelValue: number
) {
  return (m: string, $1: string) => {
    if (!$1) return m;
    const pixels = parseFloat($1);
    if (pixels < minPixelValue) return m;
    const fixedVal = toFixed(pixels / rootValue, unitPrecision);
    return fixedVal === 0 ? "0" : fixedVal + "rem";
  };
}

export default function px2RemPlugin(opt: Options): Plugin {
  const options = Object.assign(
    {
      rootValue: 16,
      unitPrecision: 5,
      minPixelValue: 0,
    },
    opt
  );
  const filter = createFilter(/\.vue$/, opt?.exclude);

  return {
    name: "style-pxtorem",
    transform(code, id) {
      if (filter(id) && pxRegex.test(code)) {
        const { rootValue, unitPrecision, minPixelValue } = options;

        return code.replace(
          pxRegex,
          createPxReplace(rootValue, unitPrecision, minPixelValue)
        );
      }
    },
  };
}
