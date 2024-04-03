import { removeToken } from '../utils/storage';
import apiInstance from './api';
import apiNoAuthInstance from './apiNoAuth';

export enum TYPE_THIRD_PARTY {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export const loginWithGoogle = async ({ token }: { token?: string }) => {
  if (!token) return;
  try {
    console.log(token);
    //chỗ này cal api lấy access token mới
    // const res = await verifyThirdPartyLogin({
    //   token,
    //   type: TYPE_THIRD_PARTY.GOOGLE,
    // });
    return 1;
  } catch (error) {
    console.error('Error login with google:', error);
  }
};

export const login = async (data: any) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const response = await apiNoAuthInstance.post('/login', data, config);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
  }
};

export const logout = async () => {
  removeToken();
};

export const getMyAlbums = async () => {
  try {
    const response = await apiInstance.get('/me/albums');
    return response.data;
  } catch (error) {
    console.error('Error fetching my albums:', error);
  }
};

export const getAllAlbums = async () => {
  try {
    const response = await apiInstance.get('/albums');
    return response.data;
  } catch (error) {
    console.error('Error fetching albums:', error);
  }
};

export const getAlbumDetail = async (id: string) => {
  try {
    const response = await apiInstance.get(`/albums/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching album detail:', error);
  }
};

export const getMyAlbumDetail = async (id: string) => {
  try {
    const response = await apiInstance.get(`/me/albums/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching my album detail:', error);
  }
};

export const createMyAlbum = async (data: any) => {
  try {
    const response = await apiInstance.post(`/me/albums`, data);
    return response.data;
  } catch (error) {
    console.error('Create album error:', error);
  }
};

export const getHistories = async () => {
  try {
    const response = await apiInstance.get(`/me/histories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching histories:', error);
  }
};

export const pushToHistories = async (data: any) => {
  try {
    const response = await apiInstance.post(`/me/histories`, data);
    return response.data;
  } catch (error) {
    console.error('Error fetching histories:', error);
  }
};

export const getMeLikes = async () => {
  try {
    const response = await apiInstance.get(`/me/likes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching likes of song:', error);
  }
};

export const createLike = async (data: any) => {
  try {
    const response = await apiInstance.post(`/me/likes`, data);
    return response.data;
  } catch (error) {
    console.error('Error like songs:', error);
  }
};

export const retrieveLike = async (data: any) => {
  try {
    const response = await apiInstance.delete(`/me/likes`, data);
    return response.data;
  } catch (error) {
    console.error('Error like songs:', error);
  }
};

export const followArtist = async (data: any) => {
  try {
    const response = await apiInstance.post(`/me/follows`, data);
    return response.data;
  } catch (error) {
    console.error('Error follow artist:', error);
  }
};

export const unfollowArtist = async (id: string) => {
  try {
    const response = await apiInstance.delete(`/me/follows/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error unfollow artist:', error);
  }
};

export const createComment = async (data: any) => {
  try {
    const response = await apiInstance.post(`/me/comments`, data);
    return response.data;
  } catch (error) {
    console.error('Error create comment:', error);
  }
};

export const deleteComment = async (id: string) => {
  try {
    const response = await apiInstance.delete(`/me/comments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error delete comment:', error);
  }
};

export const getCommentDetail = async (id: string) => {
  try {
    const response = await apiInstance.get(`/me/comments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error get comment detail:', error);
  }
};

export const getAllAuthors = async () => {
  try {
    const response = await apiInstance.get(`/authors`);
    return response.data;
  } catch (error) {
    console.error('Error get all authors:', error);
  }
};

export const getAuthorById = async (id: string) => {
  try {
    const response = await apiInstance.get(`/authors/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error get author by id:', error);
  }
};

export const getAllSingers = async () => {
  try {
    const response = await apiInstance.get(`/singers`);
    return response.data;
  } catch (error) {
    console.error('Error get all singers:', error);
  }
};

export const getSingerById = async (id: string) => {
  try {
    const response = await apiInstance.get(`/singers/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error get singer by id:', error);
  }
};

export const getAllSongs = async () => {
  try {
    const response = await apiInstance.get(`/songs`);
    return response.data;
  } catch (error) {
    console.error('Error get all songs:', error);
  }
};

export const getSongDetail = async (id: string) => {
  try {
    const response = await apiInstance.get(`/songs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error get song detail:', error);
  }
};

export const getAllGenres = async () => {
  try {
    const response = await apiInstance.get(`/genres`);
    return response.data;
  } catch (error) {
    console.error('Error get all genres:', error);
  }
};

export const getGenre = async (id: string) => {
  try {
    const response = await apiInstance.get(`/genres/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error get genres:', error);
  }
};

export const getAlbumsOfSinger = async (ids: string[]) => {
  try {
    const response = await apiInstance.get(`/singers/albums?ids=${ids.join(',')}`);
    return response.data;
  } catch (error) {
    console.error('Error get genres:', error);
  }
};

export const getCommentsOfSong = async (id: string) => {
  try {
    const response = await apiInstance.get(`/songs/${id}/comments`);
    return response.data;
  } catch (error) {
    console.error('Error get genres:', error);
  }
};
