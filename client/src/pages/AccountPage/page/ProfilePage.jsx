import axios from 'axios';
import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ user }) => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await axios.post('/logout');

    setUser(null);
    navigate('/');
  };

  return (
    <div className="text-center">
      Logged in as {user.name} ({user.email})
      <br />
      <button onClick={logoutHandler} className="primary max-w-sm mt-2">
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
