import axios, { AxiosResponse, isAxiosError } from 'axios';
import { API_URL } from '../constant';
import { SearchResult } from '../model/SearchResult';

export const search = async (q: string, pageNumber: number): Promise<SearchResult[]> => {
  try {
    const res: AxiosResponse<any> = await axios.get(API_URL + 'search', {
      params: {
        kw: q,
        pageSize: 6,
        pageNumber: pageNumber,
      },
    });
    return res.data.content;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response) {
        console.error(error.response.data.message || 'An error occurred');
      } else {
        console.error('An error occurred:', error.message);
      }

      throw error;
    } else {
      console.error('An unknown error occurred:', error);
      throw error;
    }
  }
};
