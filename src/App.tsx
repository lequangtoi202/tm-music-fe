import { publicRoutes } from './routes/routes';
import DefaultLayout from './layout/DefaultLayout/DefaultLayout';
import React, { ReactNode } from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Logout from './pages/Logout/Logout';

type LayoutComponent = React.ComponentType<{ children?: ReactNode }>;
function App() {
  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
}

export default App;
