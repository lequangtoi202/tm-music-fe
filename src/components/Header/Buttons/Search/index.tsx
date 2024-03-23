import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
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
import { ChangeEvent, ReactElement, Ref, forwardRef, useState } from 'react';

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
    setIsOpenSearchResult(false);
  };

  const handleMobileSearchClick = () => {
    if (window.innerWidth <= 767) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
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
                <SearchTwoToneIcon sx={{ fontSize: '34px', cursor: 'pointer' }} />
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
            </DialogContent>
          </StyledSearchResult>
        )}
      </SearchInputContainer>
      <MobileSearchButton>
        <Tooltip arrow title="Search">
          <IconButton color="primary" onClick={handleMobileSearchClick}>
            <SearchTwoToneIcon />
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
                  <SearchTwoToneIcon />
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
          </DialogContent>
        )}
      </DialogWrapper>
    </>
  );
}

export default HeaderSearch;
