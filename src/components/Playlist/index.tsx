import { AddCircleOutline, Close, MoreHoriz, PlayCircleOutline } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { KContext } from '../../context';
import { IAlbum } from '../../types/Album';
import { IGenre } from '../../types/Genre';
import { ISong } from '../../types/Song';
import Image from '../Image';
import { MoreAction } from '../MoreAction';
import { PlaylistModal } from '../PlaylistModal';
import { RoundedSkeleton, TitleSkeleton } from '../Skeleton';
import { StyledLayerHover, StyledWrapper } from '../Theme/styles';
import { PLaylistTitle } from './PlaylistTitle';
import {
  Container,
  StyledAddPlaylist,
  StyledAddPlaylistWrapper,
  StyledChildPlaylistItem,
  StyledItemContainer,
  StyledPlaylistItem,
} from './styles';
import { getMyAlbums } from '../../services/user';

function Playlist() {
  const [loading, setLoading] = useState(true);
  const [myAlbums, setMyAlbums] = useState<IAlbum[]>([]);
  const { setCurrentSong, setCurrentAlbum, setIsOpenMoreAction, setIsOpenAddPlaylistModal, currentAlbum } =
    useContext(KContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMyAlbums();
      setMyAlbums(res);
      setLoading(false);
    };

    fetchData();
  }, []);

  const mockGenre: IGenre[] = [
    {
      title: 'Pop',
      id: '1',
      description:
        'A genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom.',
      songs: [],
      logo: null,
      src: 'https://example.com/pop-genre',
    },
    {
      title: 'Rock',
      id: '2',
      description:
        'A genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom.',
      songs: [],
      logo: null,
      src: 'https://example.com/pop-genre',
    },
  ];
  const carousel: ISong[] = [
    {
      id: '3',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/slideshow/2024/04/05/8/3/1/d/1712301205774_org.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
    {
      id: '2',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/slideshow/2024/04/05/8/3/1/d/1712289477854_org.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
    {
      id: '1',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/playlist/2024/03/08/c/8/0/0/1709863624708_300.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
    {
      id: '4',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/playlist/2024/01/05/6/8/3/8/1704444239098_300.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
    {
      id: '5',
      title: 'Night view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/slideshow/2024/04/05/8/3/1/d/1712289222145_org.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
    {
      id: '6',
      title: 'Mountain view',
      lyric: 'Lyrics of the song',
      releaseDate: '2024-03-06',
      duration: '3:30',
      views: 100,
      track_number: 1,
      logo: 'https://avatar-ex-swe.nixcdn.com/slideshow/2024/04/05/8/3/1/d/1712289091339_org.jpg',
      file: 'path/to/song/file.mp3',
      genre: mockGenre[0],
    },
  ];
  const albumData: IAlbum[] = [
    {
      logo: 'https://images.unsplash.com/photo-1502657877623-f66bf489d236',
      title: 'Night view',
      id: '3',
      description: 'Description of Night view album',
      songs: carousel,
    },
    {
      logo: 'https://images.unsplash.com/photo-1527549993586-dff825b37782',
      title: 'Lake view',
      id: '2',
      description: 'Description of Lake view album',
      songs: carousel,
    },
    {
      logo: 'https://images.unsplash.com/photo-1532614338840-ab30cf10ed36',
      title: 'Mountain view',
      id: '1',
      description: 'Description of Mountain view album',
      songs: carousel,
    },
  ];

  const handleDeletePlaylist = (id: string) => {
    console.log(id);
    // TODO: delete playlist
  };

  return (
    <Container>
      <StyledItemContainer>
        {loading ? (
          <RoundedSkeleton />
        ) : (
          <StyledAddPlaylistWrapper>
            <StyledAddPlaylist onClick={() => setIsOpenAddPlaylistModal(true)} style={{ height: '100%' }}>
              <AddCircleOutline />
              Tạo playlist mới
            </StyledAddPlaylist>
          </StyledAddPlaylistWrapper>
        )}
      </StyledItemContainer>
      {myAlbums.map((item, index) => (
        <StyledItemContainer key={index}>
          <StyledPlaylistItem>
            <StyledChildPlaylistItem>
              {loading ? (
                <RoundedSkeleton />
              ) : (
                <StyledWrapper>
                  <StyledLayerHover>
                    <Tooltip placement="top" title="Xóa">
                      <IconButton onClick={() => handleDeletePlaylist(item.id)}>
                        <Close />
                      </IconButton>
                    </Tooltip>
                    <Tooltip placement="top" title="Phát">
                      <IconButton
                        onClick={() => {
                          const randomSong = item.songs[Math.floor(Math.random() * item.songs.length)];
                          setCurrentSong(randomSong);
                          setCurrentAlbum(item);
                        }}
                      >
                        <PlayCircleOutline />
                      </IconButton>
                    </Tooltip>
                    <Tooltip placement="top" title="Khác">
                      <IconButton
                        onClick={() => {
                          setIsOpenMoreAction(true);
                          setCurrentAlbum(item);
                        }}
                      >
                        <MoreHoriz />
                      </IconButton>
                    </Tooltip>
                  </StyledLayerHover>
                  <Image src={item.logo} />
                </StyledWrapper>
              )}
            </StyledChildPlaylistItem>
          </StyledPlaylistItem>
          {loading ? <TitleSkeleton /> : <PLaylistTitle id={item.id} title={item.title} />}
        </StyledItemContainer>
      ))}
      <PlaylistModal />
      <MoreAction song={currentAlbum} />
    </Container>
  );
}

export default Playlist;
