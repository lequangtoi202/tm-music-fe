import FacebookLogin, { FailResponse, SuccessResponse } from '@greatsumini/react-facebook-login';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Box, Checkbox, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useGoogleLogin } from '@react-oauth/google';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { FacebookIcon } from '../../assets/icons/FacebookIcon';
import { GoogleIcon } from '../../assets/icons/GoogleIcon';
import { TButton } from '../../components/Button/Button';
import Text from '../../components/Text';
import { KContext } from '../../context';
import { login, loginWithFaceBook, loginWithGoogle } from '../../services/user';
import { IUser } from '../../types/User';
import { setToken } from '../../utils/storage';
import { StyledLink } from './styles';
import Cookies from 'js-cookie';
const defaultTheme = createTheme();

export function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link style={{ color: '#1976d2' }} to="http://localhost:3001/">
        TM Music
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const schema = z.object({
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
  remember: z.boolean(),
});

type LoginForm = z.infer<typeof schema>;

function Login() {
  const { isMobile, setCurrentUser, setIsLoggedIn } = useContext(KContext);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: async () => {
      const storedEmail = Cookies.get('email');
      const storedPassword = Cookies.get('password');

      if (storedEmail && storedPassword) {
        return {
          email: storedEmail,
          password: storedPassword,
          remember: true,
        };
      }

      return {
        email: '',
        password: '',
        remember: false,
      };
    },
  });

  const onSubmit = async (loginData: LoginForm) => {
    const { email, password, remember } = loginData;
    try {
      const response = await login({ email, password });
      if (response?.data?.token) {
        if (remember) {
          Cookies.set('email', email, { expires: 365 });
          Cookies.set('password', password, { expires: 365 });
        }
        setToken(response.data.token);
        setIsLoggedIn(true);
        navigate('/');
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(true);
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      const res = await loginWithGoogle({
        token: response.access_token,
      });
      if (res && error) setError(false);
      setCurrentUser({} as IUser);
      setIsLoggedIn(true);
      navigate('/');
    },
    onError: () => {
      setError(true);
    },
  });

  const onLoginFacebookSuccess = async (response: SuccessResponse) => {
    const res = await loginWithFaceBook({
      token: response.accessToken,
    });
  };
  const onLoginFacebookFailed = (res: FailResponse) => {
    console.log(res);
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
            Đăng nhập
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: 'Email required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  autoFocus
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Password required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  value={field.value}
                  fullWidth
                  name="password"
                  label="Mật khẩu"
                  type="password"
                  onChange={(e) => field.onChange(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />
            <Controller
              name="remember"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      color="primary"
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Nhớ mật khẩu"
                />
              )}
            />
            <TButton variant="contained" title="Đăng nhập" fullWidth size="large" type="submit" sx={{ mt: 3, mb: 2 }} />
          </Box>
          <Grid container sx={{ flexDirection: isMobile ? 'column' : 'row' }}>
            <Grid item xs={12} sm>
              <Link to="/quen-mat-khau">Quên mật khẩu?</Link>
            </Grid>
            <Grid item>
              <Text style={{ fontSize: 16 }}>{'Bạn không có tài khoản?'}</Text>
              <StyledLink>
                <Link to="/dang-ky">{'Đăng ký'}</Link>
              </StyledLink>
            </Grid>
          </Grid>
          <Grid container mt={2}>
            <TButton
              sx={{ mt: 1 }}
              variant="outlined"
              startIcon={<GoogleIcon />}
              title="Tiếp tục với Google"
              fullWidth
              size="large"
              onClick={() => loginGoogle()}
            />
            <FacebookLogin
              appId="943046690640259"
              onSuccess={onLoginFacebookSuccess}
              onFail={onLoginFacebookFailed}
              render={({ onClick, logout }) => (
                <TButton
                  sx={{ mt: 1 }}
                  variant="outlined"
                  startIcon={<FacebookIcon />}
                  title="Tiếp tục với Facebook"
                  fullWidth
                  size="large"
                  onClick={onClick}
                />
              )}
            />
          </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;
