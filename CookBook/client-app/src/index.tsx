import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter, BrowserRouter } from 'react-router-dom';
import App from './app/layout/App';
import { createBrowserHistory } from 'history';
import 'react-toastify/dist/ReactToastify.min.css';


export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <ChakraProvider>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </ChakraProvider>
);
