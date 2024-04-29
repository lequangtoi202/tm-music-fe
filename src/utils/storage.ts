import { IAlbum } from '../types/Album';
import { ISong } from '../types/Song';

const LOCAL_STORAGE_KEY = 'accessToken';
const LOCAL_STORAGE_CURRENT_SONG = 'currentSong';
const LOCAL_STORAGE_CURRENT_ALBUM = 'currentAlbum';

export const getToken = () => localStorage.getItem(LOCAL_STORAGE_KEY);
export const getTempCurrentSong = () => localStorage.getItem(LOCAL_STORAGE_CURRENT_SONG);
export const getTempCurrentAlbum = () => localStorage.getItem(LOCAL_STORAGE_CURRENT_ALBUM);

export const setToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, token);
};

export const setTempCurrentSong = (song: ISong) => {
  localStorage.setItem(LOCAL_STORAGE_CURRENT_SONG, JSON.stringify(song));
};

export const setTempCurrentAlbum = (album: IAlbum) => {
  localStorage.setItem(LOCAL_STORAGE_CURRENT_ALBUM, JSON.stringify(album));
};

export const removeToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
