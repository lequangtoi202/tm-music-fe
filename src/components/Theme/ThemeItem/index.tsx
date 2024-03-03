import { Box } from '@mui/material';
import { StyledThemeItem } from '../styles';
import { ThemeItemProps } from '../types';

const ThemeItem: React.FC<ThemeItemProps> = ({ item }) => {
  return (
    <StyledThemeItem>
      <Box>{item.title}</Box>
    </StyledThemeItem>
  );
};

export default ThemeItem;
