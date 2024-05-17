import axios, { AxiosResponse, isAxiosError } from 'axios';
import { getToken, removeToken } from '../utils/storage';
import apiInstance from './api';
import apiNoAuthInstance from './apiNoAuth';

export enum TYPE_THIRD_PARTY {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
}

export const loginWithGoogle = async ({ token }: { token?: string }) => {
  if (!token) return;
  try {
    const res = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userInfo = {
      email: res.data.email,
      avatar: res.data.picture,
      first_name: res.data.name,
      last_name: res.data.name,
      login_by: TYPE_THIRD_PARTY.GOOGLE,
    };
    const response = await apiInstance.post('/google_oauth2', userInfo);
    return response.data?.data;
  } catch (error) {
    console.error('Error login with google:', error);
  }
};

export const validateComment = async (comment: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_VIETNAMESE_CLASSIFICATION_HOST}/answers/vietnamese_classification?text=${comment}`,
    );
    return data;
  } catch (error) {
    console.error('Can not validate this comment', error);
  }
};
export const loginWithFaceBook = async ({ token }: { token?: string }) => {
  if (!token) return;
  try {
    const res = await axios.get(`https://graph.facebook.com/me?fields=email,name,picture&access_token=${token}`);
    const userInfo = {
      email: res.data.email,
      avatar: res.data.picture.url,
      first_name: res.data.name,
      last_name: res.data.name,
      login_by: TYPE_THIRD_PARTY.FACEBOOK,
    };
    const response = await apiInstance.post('/google_oauth2', userInfo);
    return response.data?.data;
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

export const getMyAlbums = async (page: number) => {
  try {
    const response = await apiInstance.get(`/me/albums?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching my albums:', error);
  }
};

export const getAllAlbums = async (page: number) => {
  try {
    const response = await apiInstance.get(`/albums?page=${page}`);
    return response;
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
    return response;
  } catch (error) {
    console.error('Create album error:', error);
  }
};

export const getHistories = async (page: number) => {
  try {
    const response = await apiInstance.get(`/me/histories?page=${page}`);
    return response;
  } catch (error) {
    console.error('Error fetching histories:', error);
  }
};

export const pushToHistories = async (songId: number) => {
  try {
    const formData = new FormData();
    formData.set('song_id', songId.toString());
    const response = await apiInstance.post(`/me/histories`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
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

export const createLike = async (data: number[], params: string) => {
  try {
    const response = await apiInstance.post(`/me/likes`, {
      [params]: data,
    });
    return response;
  } catch (error) {
    console.error('Error like songs:', error);
  }
};

export const unlike = async (data: number[], params: string) => {
  try {
    const response = await apiInstance.request({
      method: 'DELETE',
      url: '/me/likes/destroys',
      data: {
        [params]: data,
      },
    });
    return response;
  } catch (error) {
    console.error('Error retrieving like:', error);
  }
};

export const followArtist = async (artistId: number) => {
  const formData = new FormData();
  formData.append('artist_id', artistId.toString());
  try {
    const response = await apiInstance.post(`/me/follows`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error follow artist:', error);
  }
};

export const unfollowArtist = async (id: number) => {
  try {
    const response = await apiInstance.delete(`/me/follows/${id}`);
    return response;
  } catch (error) {
    console.error('Error unfollow artist:', error);
  }
};

export const createComment = async (data: any) => {
  const formData = new FormData();
  formData.append('content', data.content);
  formData.append('song_id', data.songId);
  formData.append('status', data.status);
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/me/comments`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error create comment:', error);
  }
};

export const deleteComment = async (id: number) => {
  try {
    const response = await apiInstance.delete(`/me/comments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error delete comment:', error);
  }
};

export const deleteMyAlbum = async (id: number) => {
  try {
    const response = await apiInstance.delete(`/me/albums/${id}`);
    return response;
  } catch (error) {
    console.error('Error delete comment:', error);
  }
};

export const getCommentDetail = async (id: number) => {
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

export const getAllSingers = async (page: number, size?: number) => {
  try {
    let url = `/singers?page=${page}`;
    if (size) {
      url += `&page_size=${size}`;
    }
    const response = await apiInstance.get(url);
    return response;
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

export const getAllGenres = async (page: number, size?: number) => {
  try {
    let url = `/genres?page=${page}`;
    if (size) {
      url += `&page_size=${size}`;
    }
    const response = await apiInstance.get(url);
    return response;
  } catch (error) {
    console.error('Error get all genres:', error);
  }
};

export const getGenre = async (id: number) => {
  try {
    const response = await apiInstance.get(`/genres/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error get genres:', error);
  }
};

export const getGenresRelated = async (id: number) => {
  try {
    const response = await apiInstance.get(`/genres/${id}/related`);
    return response.data;
  } catch (error) {
    console.error('Error get genres related:', error);
  }
};

export const getAlbumsRelated = async (id: number) => {
  try {
    const response = await apiInstance.get(`/albums/${id}/related`);
    return response.data;
  } catch (error) {
    console.error('Error get albums related:', error);
  }
};

export const getAlbumsOfSinger = async (ids: number[]) => {
  try {
    const response = await apiInstance.get(`/singers/albums?ids=${ids.join(',')}`);
    return response.data;
  } catch (error) {
    console.error('Error get albums of singers:', error);
  }
};

export const getCommentsOfSong = async (id: number) => {
  try {
    const response = await apiInstance.get(`/songs/${id}/comments`);
    return response;
  } catch (error) {
    console.error('Error get comments of Song:', error);
  }
};

export const addSongsToPlaylist = async (playlistId: number, ids: number[]) => {
  const formData = new FormData();
  formData.append('song_ids', JSON.stringify(ids));
  try {
    const response = await apiInstance.post(`/me/albums/${playlistId}/add_song_ids`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error add song to playlist:', error);
  }
};

export const deleteSongsFromPlaylist = async (playlistId: number, ids: number[]) => {
  const formData = new FormData();
  formData.append('song_ids', JSON.stringify(ids));
  try {
    const response = await apiInstance.post(`/me/albums/${playlistId}/remove_song_ids`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error delete song to playlist:', error);
  }
};

export const createInvitation = async (data: any) => {
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('song_id', data.songId);
  try {
    const response = await apiInstance.post(`/me/invitations`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error create invitation:', error);
  }
};

export const verifyInvitation = async (code: string) => {
  try {
    const response = await apiInstance.get(`/me/invitations/${code}`);
    return response;
  } catch (error) {
    console.error('Error verify otp:', error);
    return (error as any).response.status;
  }
};

export const createCheckout = async (songId: number) => {
  const formData = new FormData();
  formData.append('song_id', songId.toString());
  try {
    const response = await apiInstance.post(`/create-checkout-session`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error create checkout:', error);
  }
};

export const createCheckoutSubmission = async () => {
  try {
    const response = await apiInstance.post(`/create-checkout-submission`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error create checkout:', error);
  }
};

export const uploadAlbumImage = async (file: any, albumId: number) => {
  const formData = new FormData();
  formData.append('logo', file);
  try {
    const response = await apiInstance.post(`/me/albums/${albumId}/songs`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error upload image:', error);
  }
};

export const upSongToAlbum = async (data: any, albumId: number) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('lyric', data.lyrics);
  formData.append('genre_id', data.genre.value);
  formData.append('logo', data.logo);
  formData.append('mp3_file', data.mp3_file);
  formData.append('artist_ids', data.artists.map((item: any) => item.value).join(','));
  try {
    const response = await apiInstance.post(`/me/albums/${albumId}/songs`, formData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error upload song to album:', error);
  }
};

export const getAlbumsByGenre = async (genreId: number, page: number, size?: number) => {
  try {
    let url = `/genres/${genreId}/albums?page=${page}`;
    if (size) {
      url += `&page_size=${size}`;
    }
    const response = await apiInstance.get(url);
    return response;
  } catch (error) {
    console.error('Error get albums by genre:', error);
  }
};

export const getRooms = async () => {
  try {
    const response = await apiInstance.get(`/me/rooms`);
    return response;
  } catch (error) {
    console.error('Error verify otp:', error);
    return (error as any).response.status;
  }
};

export const search = async (q: string): Promise<AxiosResponse<any>> => {
  try {
    const res: AxiosResponse<any> = await apiInstance.get(`/me/search?q=${q}`);
    return res;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error;
    } else {
      console.error('An unknown error occurred:', error);
      throw error;
    }
  }
};

export const suggestSongs = async () => {
  try {
    const response = await apiInstance.get('/me/suggest');
    return response.data;
  } catch (error) {
    console.error('Error get suggested songs:', error);
  }
};
