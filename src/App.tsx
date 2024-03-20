import 'bootstrap/dist/css/bootstrap.min.css';

import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import React, { Fragment, ReactNode, Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import Loading from './components/Loading';
import { clientId } from './constants';
import { DefaultLayout } from './layout/DefaultLayout';
import ThemeProvider from './theme/ThemeProvider';
import Login from './pages/Login';
import Logout from './pages/Logout';
import SignUp from './pages/SignUp';
import { publicRoutes } from './routes';
type LayoutComponent = React.ComponentType<{ children?: ReactNode }>;

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <ThemeProvider>
          <LocalizationProvider>
            <CssBaseline />
            <Suspense fallback={<Loading />}>
              <Routes>
                {publicRoutes.map((route: any, index: number) => {
                  let Layout: LayoutComponent = DefaultLayout;
                  const Page = route.component;
                  if (route.layout) {
                    Layout = route.layout;
                  } else if (route.layout === null) {
                    Layout = Fragment;
                  }

                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Suspense fallback={<Loading />}>
                          <Layout>
                            <Page />
                          </Layout>
                        </Suspense>
                      }
                    />
                  );
                })}
                <Route path={'/dang-nhap'} element={<Login />} />
                <Route path={'/dang-ky'} element={<SignUp />} />
                <Route path={'/dang-xuat'} element={<Logout />} />
              </Routes>
            </Suspense>
          </LocalizationProvider>
        </ThemeProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
