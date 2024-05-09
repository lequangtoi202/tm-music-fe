import { LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';

import { Copyright } from '../Login';
import Text from '../../components/Text';
import { StyledLink } from '../Login/styles';
import { Link } from 'react-router-dom';
import { Avatar, Box, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import { TButton } from '../../components/Button/Button';

const defaultTheme = createTheme();

export default function SignUp() {
  const [userRegistered, setUserRegistered] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: null as Date | null,
    address: '',
    email: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const clearInputData = () => {
    setFormData({
      fullName: '',
      username: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: null,
      address: '',
      email: '',
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const registerRequest = {
      ...formData,
    };

    const payload = new FormData();
    payload.append('registerRequest', JSON.stringify(registerRequest));

    try {
      const response = await axios.post(process.env.API_URL + 'auth/register', payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUserRegistered(response.data);
      clearInputData();
    } catch (err) {
      setTimeout(() => {}, 3000);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  autoFocus
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Nhập lại mật khẩu"
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="confirm-password"
                />
              </Grid>
            </Grid>
            <TButton variant="contained" title="Đăng ký" fullWidth size="large" type="submit" sx={{ mt: 3, mb: 2 }} />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Text style={{ fontSize: 16 }}>{'Đã có tài khoản?'}</Text>
                <StyledLink>
                  <Link to="/dang-nhap">{'Đăng nhập'}</Link>
                </StyledLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
