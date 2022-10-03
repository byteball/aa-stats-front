export const apiGet = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};
