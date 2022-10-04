import { corsProxyUrl } from 'conf/constants';

interface IOriginResponse {
  contents: string;
  status: {
    content_length: number;
    content_type: string;
    http_code: number;
    response_time: number;
    url: string;
  };
}

export const apiGet = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export const apiOriginGet = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(`${corsProxyUrl}${url}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const origin = await (<Promise<IOriginResponse>>response.json());
    const { contents, status } = origin;
    if (status.http_code !== 200) {
      throw new Error(
        status.content_length < 25 ? contents : `${status.http_code}`
      );
    }
    return JSON.parse(contents);
  } catch (e) {
    if (e instanceof Error) throw new Error(e.message);
    throw new Error('apiOriginGet error');
  }
};
