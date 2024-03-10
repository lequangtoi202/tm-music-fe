import { Box } from '@mui/material';
import { StyledThemeItem } from '../styles';
import { ThemeItemProps } from '../types';
import { RoundedSkeleton } from '../../Skeleton';

const ThemeItem: React.FC<ThemeItemProps> = ({ item, loading }) => {
  return <StyledThemeItem>{loading ? <RoundedSkeleton /> : <Box>{item.title}</Box>}</StyledThemeItem>;
};

export default ThemeItem;
