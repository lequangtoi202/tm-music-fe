import { Modal as BaseModal } from '@mui/base/Modal';
import { Autocomplete, Box, Button, Fade, FormControl, FormLabel, Input, Stack, TextField } from '@mui/material';
import { css, styled } from '@mui/system';
import clsx from 'clsx';
import { forwardRef, useContext, useEffect, useState } from 'react';
import { KContext } from '../../context';
import { getAllGenres, getAllSingers, upSongToAlbum } from '../../services/user';
import { IGenre } from '../../types/Genre';
import { ISinger } from '../../types/Singer';
import { TextareaAutosize } from './styles';

function UploadSongModal({ albumId }: { albumId: number | undefined }) {
  const {
    isOpenUpload,
    setIsOpenUpload,
    setSuccess,
    setError,
    setChangedPlaylist,
    playlistChanged,
    setIsOpenMoreAction,
  } = useContext(KContext);
  const [genresOptions, setGenresOptions] = useState<any>([]);
  const [artistsOptions, setArtistsOptions] = useState<any>([]);
  const [form, setForm] = useState({
    title: '',
    lyrics: '',
    genre: {},
    artists: [],
    mp3_file: null,
    logo: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleClose = () => {
    setIsOpenUpload(false);
  };

  const fetchData = async () => {
    const resGenres = await getAllGenres(1, 1000);
    setGenresOptions(
      resGenres?.data?.genres.map((genre: IGenre) => {
        return {
          label: genre.title,
          value: genre.id,
        };
      }),
    );
    const resArtists = await getAllSingers(1, 1000);
    setArtistsOptions(
      resArtists?.data?.singers.map((artist: ISinger) => {
        return {
          label: artist.name,
          value: artist.id,
        };
      }),
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setForm({
        ...form,
        [event.target.name]: event.target.files[0],
      });
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!albumId) return;
    const res = await upSongToAlbum(form, albumId);
    if (res.success) {
      setSuccess('Thêm bài hát thành công');
      setIsOpenMoreAction(false);
      setIsOpenUpload(false);
      setChangedPlaylist(!playlistChanged);
    } else {
      setError('Thêm bài hát không thành công');
      setIsOpenMoreAction(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Modal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={isOpenUpload}
      onClose={handleClose}
      slots={{ backdrop: StyledBackdrop }}
    >
      <Fade in={isOpenUpload}>
        <ModalContent sx={{ width: 520, height: 520 }}>
          <Box width={'100%'} height={'100%'} overflow={'scroll'} display={'flex'}>
            <form onSubmit={onSubmit} style={{ width: '100%' }}>
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                    <TextField
                      required
                      name="title"
                      onChange={handleChange}
                      id="outlined-basic"
                      label="Tên bài hát"
                      variant="outlined"
                      value={form.title}
                    />
                  </FormControl>
                </Stack>
                <Stack spacing={1}>
                  <FormControl sx={{ display: { sm: 'flex-column', md: 'flex-row' }, gap: 2 }}>
                    <TextareaAutosize
                      value={form.lyrics}
                      name="lyrics"
                      onChange={handleChange}
                      required
                      minRows={3}
                      placeholder="Lời bài hát"
                    />
                  </FormControl>
                </Stack>
                <Stack spacing={1}>
                  <FormControl>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={genresOptions}
                      fullWidth
                      onChange={(event, newValue) => {
                        setForm({ ...form, genre: newValue as {} });
                      }}
                      renderInput={(params) => (
                        <TextField name="genre" value={form.genre} required {...params} label="Thể loại" />
                      )}
                    />
                  </FormControl>
                </Stack>
                <Stack spacing={1}>
                  <FormControl>
                    <Autocomplete
                      multiple
                      disablePortal
                      id="combo-box-demo2"
                      options={artistsOptions}
                      fullWidth
                      onChange={(event, newValue: string[]) => {
                        setForm({ ...form, artists: newValue as any });
                      }}
                      renderInput={(params) => (
                        <TextField name="artists" value={form.artists} {...params} label="Nghệ sĩ" />
                      )}
                    />
                  </FormControl>
                </Stack>
                <Stack spacing={1}>
                  <FormLabel>
                    Ảnh
                    <input type="file" name="logo" onChange={handleFileChange} required accept="image/*" />
                  </FormLabel>
                </Stack>
                <Stack spacing={1}>
                  <FormLabel>
                    File nhạc
                    <input type="file" name="mp3_file" onChange={handleFileChange} required accept="audio/*" />
                  </FormLabel>
                </Stack>

                <Button sx={{ borderRadius: '18px' }} type="submit" variant="contained">
                  Tải lên
                </Button>
              </Stack>
            </form>
          </Box>
        </ModalContent>
      </Fade>
    </Modal>
  );
}

export const Backdrop = forwardRef<HTMLDivElement, { open?: boolean; className: string }>((props, ref) => {
  const { open, className, ...other } = props;
  return <div className={clsx({ 'base-Backdrop-open': open }, className)} ref={ref} {...other} />;
});

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

export const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 10;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.2);
  -webkit-tap-highlight-color: transparent;
`;

export const ModalContent = styled('div')(
  ({ theme }) => css`
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.4)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `,
);

export default UploadSongModal;
