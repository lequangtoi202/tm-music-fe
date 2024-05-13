import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  Chip,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { ChangeEvent, ReactElement, Ref, forwardRef, useContext, useEffect, useState } from 'react';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Headphones, PlayCircleOutline, SearchTwoTone } from '@mui/icons-material';
import { KContext } from '../../../../context';
import { useDebounce } from '../../../../hook';
import * as searchServices from '../../../../services/user';
import { PlaylistItem, SongTitle, StyledBox, StyledBoxTitle } from '../../../AlbumDetail/styles';
import { DialogWrapper, MobileSearchButton, SearchInputContainer, StyledSearchResult } from './styles';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
    background: ${theme.colors.alpha.white[100]};
    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(16)};
    }

  .loading {
    animation: spinner 0.8s linear infinite;
    margin-top: 16px;
  }

  @keyframes spinner {
    from {
      transform: translateY(-50%) rotate(0);
    }
    to {
      transform: translateY(-50%) rotate(360deg);
    }
  }

`,
);

const DialogTitleWrapper = styled(DialogTitle)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(1)}
`,
);

function HeaderSearch() {
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const [isOpenSearchResult, setIsOpenSearchResult] = useState(false);
  const { setError } = useContext(KContext);
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    setLoading(true);
    const fetchApi = async () => {
      const res = await searchServices.search(debouncedValue.trim());
      if (res.status !== 200) {
        setError(res.data.message);
      }
      setSearchResult(res.data);
      setLoading(false);
    };
    const timeoutId = setTimeout(() => {
      setLoading(true);
      fetchApi();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [debouncedValue]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
    setIsOpenSearchResult(true);
    if (event.target.value) {
      if (!openSearchResults) {
        setOpenSearchResults(true);
      }
    } else {
      setOpenSearchResults(false);
      setIsOpenSearchResult(false);
    }
  };

  const handleClearSearch = () => {
    setSearchValue('');
    setSearchResult([]);
    setIsOpenSearchResult(false);
  };

  const handleMobileSearchClick = () => {
    if (window.innerWidth <= 767) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    handleClearSearch();
  };

  const renderPlaylistItem = (type: string, data: any, index: number) => {
    const label = type === 'album' ? 'Album' : 'Bài hát';
    return (
      <PlaylistItem key={index}>
        <SongTitle>
          <Headphones sx={{ marginRight: '8px' }} />
          <StyledBox>
            <StyledBoxTitle>
              <Typography variant="inherit" noWrap>
                {data.title}
              </Typography>
            </StyledBoxTitle>
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <StyledBoxTitle>{data?.singers?.[0]?.name}</StyledBoxTitle>
              <Chip label={label} />
            </Box>
          </StyledBox>
          <Tooltip placement="top" title="Phát">
            <IconButton onClick={() => {}}>
              <PlayCircleOutline />
            </IconButton>
          </Tooltip>
        </SongTitle>
      </PlaylistItem>
    );
  };

  return (
    <>
      <SearchInputContainer>
        <SearchInputWrapper
          value={searchValue}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {loading && (
                  <FontAwesomeIcon
                    style={{ fontSize: '16px', cursor: 'pointer' }}
                    className="loading"
                    icon={faSpinner}
                  />
                )}
                {!loading && <SearchTwoTone sx={{ fontSize: '34px', cursor: 'pointer' }} />}
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {searchValue && (
                  <IconButton sx={{ p: 0 }} onClick={handleClearSearch}>
                    <ClearIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
            size: 'small',
          }}
          placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát"
          fullWidth
        />
        {isOpenSearchResult && (
          <StyledSearchResult>
            <DialogContent>
              <Box sx={{ pt: 1, pb: 1 }} display="flex" justifyContent="space-between">
                <Typography fontSize={16} fontWeight={'bold'} variant="body2" component="span">
                  Gợi ý kết quả
                </Typography>
              </Box>
              <Box>
                {searchResult.length > 0 &&
                  searchResult.map((result: any, index: number) => {
                    const { type, data } = result;
                    return renderPlaylistItem(type, data, index);
                  })}
              </Box>
            </DialogContent>
          </StyledSearchResult>
        )}
      </SearchInputContainer>
      <MobileSearchButton>
        <Tooltip arrow title="Search">
          <IconButton color="primary" onClick={handleMobileSearchClick}>
            <SearchTwoTone />
          </IconButton>
        </Tooltip>
      </MobileSearchButton>

      <DialogWrapper
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="sm"
        fullWidth
        scroll="paper"
        onClose={handleClose}
      >
        <DialogTitleWrapper>
          <SearchInputWrapper
            value={searchValue}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {loading && (
                    <FontAwesomeIcon
                      style={{ fontSize: '16px', cursor: 'pointer' }}
                      className="loading"
                      icon={faSpinner}
                    />
                  )}
                  {!loading && <SearchTwoTone sx={{ cursor: 'pointer' }} />}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {searchValue && (
                    <IconButton sx={{ p: 0 }} onClick={handleClearSearch}>
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát"
            fullWidth
          />
        </DialogTitleWrapper>
        <Divider />
        {isOpenSearchResult && (
          <DialogContent sx={{ p: 1.5 }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" fontSize={16} fontWeight={'bold'} color={'#1976d2'} component="span">
                Gợi ý kết quả
              </Typography>
            </Box>
            <Box>
              {searchResult.length > 0 &&
                searchResult.map((result: any, index: number) => {
                  const { type, data } = result;
                  if (type === 'album') {
                    return (
                      <PlaylistItem key={index}>
                        <SongTitle>
                          <Headphones sx={{ marginRight: '8px' }} />
                          <StyledBox>
                            <StyledBoxTitle>
                              <Typography variant="inherit" noWrap>
                                {data.title}
                              </Typography>
                            </StyledBoxTitle>
                            <Box display={'flex'} alignItems={'center'} gap={1}>
                              <StyledBoxTitle>{data?.singers?.[0]?.name}</StyledBoxTitle>
                              <Chip label="Album" />
                            </Box>
                          </StyledBox>
                          <Tooltip placement="top" title="Phát">
                            <IconButton onClick={() => {}}>
                              <PlayCircleOutline />
                            </IconButton>
                          </Tooltip>
                        </SongTitle>
                      </PlaylistItem>
                    );
                  } else if (type === 'song') {
                    return (
                      <PlaylistItem key={index}>
                        <SongTitle>
                          <Headphones sx={{ marginRight: '8px' }} />
                          <StyledBox>
                            <StyledBoxTitle>
                              <Typography variant="inherit" noWrap>
                                {data.title}
                              </Typography>
                            </StyledBoxTitle>
                            <Box display={'flex'} alignItems={'center'} gap={1}>
                              <StyledBoxTitle>{data?.singers?.[0]?.name}</StyledBoxTitle>
                              <Chip label="Bài hát" />
                            </Box>
                          </StyledBox>
                          <Tooltip placement="top" title="Phát">
                            <IconButton onClick={() => {}}>
                              <PlayCircleOutline />
                            </IconButton>
                          </Tooltip>
                        </SongTitle>
                      </PlaylistItem>
                    );
                  }
                })}
            </Box>
          </DialogContent>
        )}
      </DialogWrapper>
    </>
  );
}

export default HeaderSearch;
