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

    case "json":
      return await getFromJson(site, slug);
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
    if (!data || Object.keys(data).length === 0) {
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

import path from "path";
import { promises as fs } from "fs";
const getFromJson = async (site: string, slug: string) => {
  let error: any = {};
  let data: DataType;

  try {
    const filePath = path.join(process.cwd(), "tmp/data.json");
    const jsonData = await fs.readFile(filePath);
    // @ts-ignore
    const objectData = JSON.parse(jsonData);
    data = objectData[`${site}${slug}`];

    if (!data) {
      data = await page.getBySiteAndPage(site, slug);
      const newObjectData = { ...objectData, ...{ [`${site}${slug}`]: data } };
      await fs.writeFile(filePath, JSON.stringify(newObjectData));
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
