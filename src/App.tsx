import 'bootstrap/dist/css/bootstrap.min.css';

import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import React, { ReactNode } from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { DefaultLayout } from './layout/DefaultLayout';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import SignUp from './pages/SignUp/SignUp';
import ThemeProvider from './theme/ThemeProvider';
import { publicRoutes } from './routes';
type LayoutComponent = React.ComponentType<{ children?: ReactNode }>;

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LocalizationProvider>
          <CssBaseline />
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
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
            <Route path={'/sign-in'} element={<Login />} />
            <Route path={'/sign-up'} element={<SignUp />} />
            <Route path={'/logout'} element={<Logout />} />
          </Routes>
        </LocalizationProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
