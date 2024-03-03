import { Route, Routes } from 'react-router';
import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './Layout';
import axios from 'axios';
import { UserContextProvider } from './context/UserContext';
import AccountPage from './pages/AccountPage/AccountPage';
import { urlServer } from '../constants';
import PlacesForm from './pages/AccountPage/page/components/PlacesForm';
import PlacePage from './pages/PlacePage';

axios.defaults.baseURL = urlServer;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/place/:id" element={<PlacePage />} />

          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/account/:subpage/:action" element={<AccountPage />} />
          <Route path="/account/places/new" element={<PlacesForm />} />
          <Route path="/account/places/:id" element={<PlacesForm />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
