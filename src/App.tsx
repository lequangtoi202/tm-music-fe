import 'bootstrap/dist/css/bootstrap.min.css';

import { CssBaseline } from '@mui/material';
import React, { Fragment, ReactNode, Suspense, useContext, useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import Loading from './components/Loading';
import { clientId } from './constants';
import { DefaultLayout } from './layout/DefaultLayout';
import Login from './pages/Login';
import Logout from './pages/Logout';
import { publicRoutes } from './routes';
import ThemeProvider from './theme/ThemeProvider';
import { getCurrentUser } from './utils/storage';
type LayoutComponent = React.ComponentType<{ children?: ReactNode }>;

function App() {
  const localUser = getCurrentUser();

  const ProtectedRoute = ({ children }: { children?: ReactNode }) => {
    if (!localUser) {
      return <Navigate to={`/login`} />;
    }
    return children;
  };
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <ThemeProvider>
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
                        <ProtectedRoute>
                          <Layout>
                            <Page />
                          </Layout>
                        </ProtectedRoute>
                      </Suspense>
                    }
                  />
                );
              })}
              <Route path={'/login'} element={<Login />} />
              <Route path={'/logout'} element={<Logout />} />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
