import page from "src/lib/page";
import { DataType } from "./types";
import { readFromKV, writeToKv } from "./lib/cloudflare";

const getPageData = async ({
  site,
  slug = "",
  source = "supabase",
}: {
  site: string;
  slug?: string;
  source?: string;
}) => {
  switch (source) {
    case "cloudflare":
      return await getFromCloudFlareKV(site, slug);
    default:
      return await getFromSupabase(site, slug);
  }
};

export default getPageData;

const getFromCloudFlareKV = async (site: string, slug: string) => {
  let error: any = {};
  let data: any;

  try {
    data = await readFromKV(`${site}${slug}`);
    if (!data || String(data).trim().toLowerCase() === "none") {
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

const getFromSupabase = async (site: string, slug: string) => {
  let error: any = {};
  let data: DataType;

  try {
    data = await page.getBySiteAndPage(site, slug);
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
