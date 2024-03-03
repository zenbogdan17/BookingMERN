import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const [settingsWindow, setSettingsWindow] = useState(false);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const linkStyle = 'py-2 px-4 rounded-2xl hover:bg-slate-200';

  const handlerWindowSettings = () => {
    if (!user) {
      return navigate('/login');
    }

    setSettingsWindow(!settingsWindow);
  };

  return (
    <header className="flex justify-between relative">
      <Link to="/" className="flex items-center gap-1 text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 -rotate-90"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
        <span className="font-bold text-3xl">airbnb</span>
      </Link>

      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
        <div>Any where</div>

        <div className="border-l border-gray-300" />

        <div>Any week</div>

        <div className="border-l border-gray-300" />

        <div>Add guests</div>

        <button className="bg-primary rounded-full text-white p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      <div
        className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 cursor-pointer hover:shadow-lg"
        onClick={handlerWindowSettings}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>{' '}
        <div className=" bg-gray-500 rounded-full text-white border border-gray-500 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 relative top-1"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {user && <div>{user.name}</div>}
      </div>

      {settingsWindow && (
        <div className="flex flex-col gap-2 w-48 z-10 bg-white absolute right-0 top-14 border border-gray-300 rounded-2xl shadow-md shadow-gray-300">
          <Link
            className={linkStyle}
            onClick={handlerWindowSettings}
            to={'/account/profile'}
          >
            Profile
          </Link>
          <Link
            className={linkStyle}
            onClick={handlerWindowSettings}
            to={'/account/booking'}
          >
            My bookings
          </Link>
          <Link
            className={linkStyle}
            onClick={handlerWindowSettings}
            to={'/account/places/new'}
          >
            Add a new place
          </Link>
          <Link
            className={linkStyle}
            onClick={handlerWindowSettings}
            to={'/account/places'}
          >
            My accommodations
          </Link>
          <Link
            className={linkStyle}
            onClick={handlerWindowSettings}
            to={'/account/favorites'}
          >
            Favorites
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
