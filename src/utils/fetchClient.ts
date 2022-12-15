const BASE_URL = 'https://jsonplaceholder.typicode.com';

import axios from 'axios';

const request = <T>(url: string): Promise<T> => {
  return axios
    .get(BASE_URL + url)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      throw new Error(err.message);
    });
};

export const client = {
  get: <T>(url: string) => request<T>(url),
};
