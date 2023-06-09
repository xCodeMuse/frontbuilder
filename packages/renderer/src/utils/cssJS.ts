import { ElementType } from "../types";
import { removeNonCSSProps } from "./index";
import { MEASUREMENT } from "../constants";

let allStyles = "";
export const constructStyles = (element: ElementType | string) => {
  allStyles = "";
  if (typeof element === "string") return;
  appendStyle(element);
};

export const getStyles = () => allStyles;
const appendStyle = (element: ElementType) => {
  const { name, textContent, mdScreen, smScreen, ...styles } = element.props;
  const _styles = removeNonCSSProps(styles);

  allStyles += `
    #${formatId(element.uuid)} {
      ${Object.keys(_styles)
        .map((key) => {
          return `${toKebabCase(key)}: ${_styles[key]};`;
        })
        .join("")}
    }
    `;

  if (mdScreen) {
    const _mdStyles = removeNonCSSProps(mdScreen);
    allStyles += `
      @media (max-width: ${MEASUREMENT.TABLET_SCREEN}) {
        #${formatId(element.uuid)} {
          ${Object.keys(_mdStyles)
            .map((key) => {
              return `${toKebabCase(key)}: ${_mdStyles[key]};`;
            })
            .join("")}
        }`;
  }

  if (smScreen) {
    const _smStyles = removeNonCSSProps(smScreen);
    allStyles += `
      @media (max-width: ${MEASUREMENT.MOBILE_SCREEN}) {
        #${formatId(element.uuid)} {
          ${Object.keys(_smStyles)
            .map((key) => {
              return `${toKebabCase(key)}: ${_smStyles[key]};`;
            })
            .join("")}
        }`;
  }

  if (formatId(element.uuid) === "root") {
    allStyles += `
      #${formatId(element.uuid)} {
        min-height: 100vh;
      }
    `;
  }

  element.children.forEach((child) => {
    if (typeof child === "string") return;
    appendStyle(child);
  });
};

// function to convert camelCase to kebab-case
const toKebabCase = (str: string) =>
  str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();

export const formatId = (id: string | undefined): any => {
  if (!id) return "";
  if (id.trim() === "0.1") return "root";
  let newId = String(id).replace(/-./g, "");
  // check if the first character is a number
  if (newId.match(/^\d/)) {
    // remove the first character
    newId = newId.substring(1);
    return formatId(newId);
  } else {
    return newId;
  }
};
