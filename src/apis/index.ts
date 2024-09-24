const baseURL = process.env.NEXT_PUBLIC_API_HOST;

type GetFn = (arg: {
  path?: string;
  headers?: Record<string, string>;
  body?: object;
  externalUrl?: string;
}) => Promise<Response | undefined>;

export const get: GetFn = async ({ path, headers, body, externalUrl }) => {
  try {
    let url;

    if (externalUrl) {
      url = externalUrl;
    } else {
      url = `${baseURL}/${path}`;
    }

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    };

    const result = await fetch(url, options);
    const data = await result.json();

    if (!result.ok) {
      throw Error("Http Error");
    }
    return data;
  } catch (err) {
    console.error(err);
  }
};

type PostFn = (arg: {
  path?: string;
  headers?: Record<string, string>;
  body?: object;
  externalUrl?: string;
}) => Promise<Response | undefined>;

export const post: PostFn = async ({ path, headers, body, externalUrl }) => {
  try {
    let url;

    if (externalUrl) {
      url = externalUrl;
    } else {
      url = `${baseURL}/${path}`;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    };

    const result = await fetch(url, options);
    const data = await result.json();

    if (!result.ok) {
      throw Error("Http Error");
    }
    return data;
  } catch (err) {
    console.error(err);
  }
};
