import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { urlServer } from '../../../../../constants';
import { truncateText } from './../../../../utils/index';
import { Link } from 'react-router-dom';
import Loader from '../../../../components/Loader';

const ListAllPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get('/user-places');

        setPlaces(data);
      } catch (error) {
        toast.error(error?.response?.data);

        console.error('Error fetching data:', error.response.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-4 ">
      {isLoading && <Loader />}

      {places.length > 0 &&
        places.map((place) => (
          <Link
            to={`/account/places/${place._id}`}
            className="flex cursor-pointer gap-4 p-4 mb-4 bg-gray-200 rounded-2xl shadow-xl "
            key={place._id}
          >
            <div className="">
              {place.photos.length && (
                <div className="relative">
                  <img
                    className="min-w-32 w-32 h-32 object-cover rounded-lg shadow-lg"
                    src={urlServer + '/uploads/' + place.mainPhoto}
                    alt="place photo"
                  />
                  <span className="flex items-center  gap-1 absolute bottom-2 right-2 bg-white p-2 rounded-full opacity-80">
                    {place.photos.length}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 pt-[2px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col h-full w-full grow-0 shrink">
              <h2 className="text-xl"> {place.title}</h2>

              <p className="text-sm mt-2">
                {truncateText(place.description, 270)}
              </p>

              <div className="flex justify-between">
                <p className="mt-5 text-lg">
                  Address:{' '}
                  <span className=" font-semibold"> {place.address}</span>
                </p>

                <p className="mt-5 text-lg">
                  Price: <span className="font-semibold">{place.price}$</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ListAllPlaces;
