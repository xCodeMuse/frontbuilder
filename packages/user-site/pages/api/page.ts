import { renderToString } from "react-dom/server";
import getPageData from "../../src/getPageData";
import Renderer, { registerElements } from "@frontbuilder/renderer";
import { constructStyles } from "@frontbuilder/renderer/src/utils/cssJS";

import htmlPage from "../htmlPage";
import Page404 from "../404";
import Page500 from "../500";
import UnPublishedPage from "../UnPublishedPage";
import React from "react";

const pageIsNotFound = "PGRST116";
export default async function handler(req, res) {
  registerElements();
  const {
    headers: { host },
    url,
  } = req;

  try {
    // Extract the domain name from the host
    // Extract the domain name from the host, excluding "frontbuilder.site"
    const site = host.replace(`.frontbuilder.site`, "").replace("www.", "");
    const slug = url.replace("/", "");

    const { props } = await getPageData({ site, slug });
    const { data, error } = props;

    // Render your React component into HTML
    const componentHtml = renderToString(getComponent(data, error));
    constructStyles(data?.page?.published || "");

    // Set the response header
    res.setHeader("Content-Type", "text/html");

    // Send the complete HTML document as the response
    res.send(htmlPage(componentHtml, data?.page?.title || ""));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

const getComponent = (data, error) => {
  if (error?.code === pageIsNotFound || !data?.page) {
    return Page404();
  }

  if (error?.code) {
    return Page500();
  }

  if (
    !data?.page?.published ||
    Object.keys(data?.page?.published).length === 0
  ) {
    return UnPublishedPage();
  }

  return Renderer({ element: data?.page?.published || "", parent: null });
};
