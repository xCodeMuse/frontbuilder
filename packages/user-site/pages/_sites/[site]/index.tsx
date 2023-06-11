import React from "react";
import Renderer, { FrontbuilderBadge } from "@frontbuilder/renderer";
import { registerElements } from "@frontbuilder/renderer";

import { ApiErrorType, DataType } from "src/types";
import Page404 from "pages/404";
import Page500 from "pages/500";
import getPageData from "src/getPageData";
import UnPublishedPage from "../../UnPublishedPage";
import CustomHead from "../../../src/CustomHead";
import {
  constructStyles,
  getStyles,
} from "@frontbuilder/renderer/src/utils/cssJS";

registerElements();
const pageIsNotFound = "PGRST116";
export default function Index({
  data,
  error,
  styles,
}: {
  data: DataType;
  error: ApiErrorType;
  styles: string;
}) {
  if (error?.code === pageIsNotFound || !data?.page) {
    return <Page404 data={data} />;
  }

  if (error?.code) {
    return <Page500 error={error} />;
  }

  if (
    !data?.page?.published ||
    Object.keys(data?.page?.published).length === 0
  ) {
    return <UnPublishedPage />;
  }

  return (
    <>
      <CustomHead
        title={data?.page?.name}
        favicon={data?.website?.favicon || "/favicon.ico"}
        styles={styles}
      />
      <Renderer element={data?.page?.published || ""} parent={null} />
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  const result = await getPageData(query);
  constructStyles(result.props.data?.page?.published || "");
  return {
    props: {
      data: result.props.data,
      error: result.props.error,
      styles: getStyles(),
    },
  };
};
