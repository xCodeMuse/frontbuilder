import { getGlobalStyles } from "./globalStyles";
import { getStyles } from "@frontbuilder/renderer/src/utils/cssJS";

const htmlPage = (componentHtml, pageTitle) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>${pageTitle}</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="test-susan-site.frontbuilder.site/globalCSS">
          <style>${getGlobalStyles()}</style>
          <style>${getStyles()}</style>   
        </head>
        <body>
          <div id="root">${componentHtml}</div>
          <!-- Add any other scripts needed -->
        </body>
      </html>
    `;
};

export default htmlPage;
