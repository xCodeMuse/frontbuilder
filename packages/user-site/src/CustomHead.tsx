import Head from "next/head";
import React from "react";

const CustomHead = ({
  title = "Page",
  favicon = "/favicon.ico",
  styles = "",
}: {
  title: string;
  favicon?: string;
  styles?: string;
}) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href={favicon} />
      <style id="stitches" dangerouslySetInnerHTML={{ __html: styles }} />
    </Head>
  );
};

export default CustomHead;
