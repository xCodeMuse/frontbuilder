const endpoint = (key) => {
  const accountID = process.env.CLOUDFLARE_ACCOUNT_ID;
  const namespaceID = process.env.CLOUDFLARE_KV_NAMESPACE_ID;
  return `https://api.cloudflare.com/client/v4/accounts/${accountID}/storage/kv/namespaces/${namespaceID}/values/${key}`;
};

export const readFromKV = async (key: string) => {
  const { value } = await fetch(
    `https://frontbuilder-worker.hadi-syahbal.workers.dev/?key=${key}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => {
    return response.json();
  });
  return value;
};

export const writeToKv = async (key: string, value: any) => {
  const { success, result, errors } = await fetch(endpoint(key), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${process.env.CLOUDFLARE_KV_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  }).then((response) => response.json());

  if (success) {
    return result;
  }

  if (errors) {
    throw new Error(errors);
  }
};
