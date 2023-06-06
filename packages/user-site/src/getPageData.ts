import page from "src/lib/page";
import { DataType } from "./types";
import { readFromKV, writeToKv } from "./lib/cloudflare";

const getPageData = async ({
  site,
  slug = "",
}: {
  site: string;
  slug?: string;
}) => {
  let error: any = {};
  let data: DataType;

  try {
    data = await readFromKV(`${site}${slug}`);
    if (!data) {
      data = await page.getBySiteAndPage(site, slug);
      await writeToKv(`${site}${slug}`, data);
    }
  } catch (e) {
    error = e;
  }

  return {
    props: {
      data: data || null,
      error,
    },
  };
};

export default getPageData;
