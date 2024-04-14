import { ButtonProps } from '@mui/material';

export interface TButtonProps extends ButtonProps {
  title: string;
  loading?: boolean;
}
