import React, { useContext } from 'react';
import { urlServer } from '../../../constants';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Place = ({ data, favorite }) => {
  const { setUser } = useContext(UserContext);

  const handlerFavoritePlace = async () => {
    const { data: userData } = await axios.post(`favorite/${data._id}`);

    toast.success('Favorites list changed');
    setUser(userData);
  };

  return (
    <div className=" relative">
      <Link to={`/place/${data._id}`}>
        <img
          className="rounded-xl h-64 w-full object-cover "
          src={urlServer + '/uploads/' + data.mainPhoto}
          alt="place photo"
        />

        <div className="mt-1">
          <h2 className="font-bold text-md truncate ">{data.title}</h2>

          <p className="text-sm text-gray-500 truncate">{data.address}</p>

          <p className="text-md font-semibold mt-1">
            ${data.price}
            <span className="font-light"> night</span>
          </p>
        </div>
      </Link>

      {favorite && (
        <div className="absolute right-6 top-4" onClick={handlerFavoritePlace}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={`${favorite ? 'red' : 'none'}`}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-8 h-8 ${
              favorite ? 'text-primary' : ''
            } cursor-pointer hover:scale-95`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Place;
