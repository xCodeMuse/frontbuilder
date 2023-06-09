import { ElementType } from "../types";
import { removeNonCSSProps } from "./index";

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

export const formatId = (id: string | undefined) => {
  if (!id) return "";
  if (id.trim() === "0.1") return "root";
  const newId = String(id).replace(/-./g, "");
  // check if the first character is a number
  if (newId.match(/^\d/)) {
    // remove the first character
    return newId.substring(1);
  }

  return newId;
};
