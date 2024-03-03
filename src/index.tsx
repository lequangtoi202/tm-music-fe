import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import GlobalStyles from './components/GlobalStyles/GlobalStyles';
import './index.css';
import { store } from './redux/store';
import reportWebVitals from './reportWebVitals';
import { SidebarProvider } from './context/SidebarContext';
import { KContextProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GlobalStyles>
      <KContextProvider>
        <SidebarProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </SidebarProvider>
      </KContextProvider>
    </GlobalStyles>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
