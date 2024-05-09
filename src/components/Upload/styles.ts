import styled from 'styled-components';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: '#1C2025';
  background: '#fff';
  border: 1px solid '#DAE2ED';
  box-shadow: 0px 2px 2px '#F3F6F9';

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px '#b6daff';
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

export { TextareaAutosize };
