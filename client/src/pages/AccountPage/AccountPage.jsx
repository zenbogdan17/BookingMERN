import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import ProfilePage from './page/ProfilePage';
import PlacesPage from './page/PlacesPage';
import AccountNav from './components/AccountNav';
import MyBookings from './page/MyBookings';
import FavoritesPage from './page/FavoritesPage';

const AccountPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  let { subpage } = useParams();

  useEffect(() => {
    if (!user) {
      const timerId = setTimeout(() => {
        navigate('/login');
      }, 4000);

      return () => clearTimeout(timerId);
    }
  }, [user, navigate]);

  if (!user) {
    return <Loader />;
  }

  if (subpage === undefined) {
    subpage = 'profile';
  }

  return (
    <div>
      <AccountNav />

      {subpage === 'profile' && <ProfilePage user={user} />}

      {subpage === 'booking' && <MyBookings />}

      {subpage === 'places' && <PlacesPage />}

      {subpage === 'favorites' && <FavoritesPage user={user} />}
    </div>
  );
};

export default AccountPage;
