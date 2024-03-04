import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import PlacePhotos from './components/PlacePhotos';
import BookingWidget from './components/BookingWidget';
import { format } from 'date-fns';
import { UserContext } from '../context/UserContext';
import { urlClient } from '../../constants';

const PlacePage = () => {
  const [infoPlace, setInfoPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserBookThisPlace, setIsUserBookThisPlace] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setIsUserBookThisPlace(user.bookings.find((book) => book.place === id));
      setIsFavorite(user.favorites.includes(id));
    }
  }, [user]);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`places/${id}`)
      .then(({ data }) => setInfoPlace(data))
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const handlerFavoritePlace = async () => {
    if (!user) {
      toast('You must register for this action', {
        icon: '❗',
      });
    }

    const { data } = await axios.post(`favorite/${id}`);

    toast.success('Favorites list changed');
    setUser(data);
  };

  const handleShareClick = () => {
    const linkToPlace = window.location.href;

    navigator.clipboard.writeText(linkToPlace).then(() => {
      toast('Copied link to place');
    });
  };

  return (
    <>
      {isLoading && <Loader />}

      {infoPlace && (
        <div>
          <div className="flex mt-8 justify-between">
            <h1 className="text-2xl font-semibold leading-6 tracking-wider">
              {infoPlace.title}
            </h1>

            <div className="flex gap-6">
              <button
                className="flex items-center gap-1 bg-transparent underline
                "
                onClick={handleShareClick}
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
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                Share
              </button>

              <div
                className="flex items-center gap-1 underline cursor-pointer"
                onClick={handlerFavoritePlace}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={`${isFavorite ? 'red' : 'none'}`}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-8 h-8 ${
                    isFavorite ? 'text-primary' : ''
                  } cursor-pointer`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                Favorite
              </div>
            </div>
          </div>

          <PlacePhotos
            mainPhoto={infoPlace.mainPhoto}
            allPhoto={infoPlace.photos}
          />

          <a
            className="flex gap-2 underline my-3"
            href={'https://maps.google.com/?q=' + infoPlace.address}
            target="_blank"
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
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>{' '}
            {infoPlace.address}
          </a>

          <div className="flex flex-wrap gap-3 mt-2 border rounded-2xl p-4 shadow-lg">
            <p> Check-in: {infoPlace.checkIn}</p>
            {'·'}
            <p> Check-out: {infoPlace.checkOut}</p> {'·'}
            <p>Max number of guests: {infoPlace.maxGuests}</p> {'·'}
            <p>
              {' '}
              Number of bedroom: {Math.floor(infoPlace.maxGuests / 2)}
            </p>{' '}
            {'·'}
            <p> Beds: {Math.floor(infoPlace.maxGuests / 2) + 1}</p> {'·'}
            <p> Bathrooms: {Math.round(Math.random()) + 1}</p>
          </div>

          {isUserBookThisPlace && (
            <div className="bg-gradient-to-r from-primary to-purple-700 rounded-lg mt-3 p-6 shadow-lg text-white text-center transform hover:scale-105 transition-transform duration-300">
              <Link to={'/account/booking'}>
                <p className="text-xl font-bold mb-2">Your reservation:</p>
                <p className="text-lg">
                  Check-in: {format(isUserBookThisPlace.checkIn, 'dd.MM.yyyy')}
                </p>
                <p className="text-lg">
                  Check-out:{' '}
                  {format(isUserBookThisPlace.checkOut, 'dd.MM.yyyy')}
                </p>
              </Link>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 my-4">
            <div className="text-lg">
              {!isUserBookThisPlace && infoPlace.bookings.length !== 0 && (
                <div className="mb-3 border rounded-2xl p-4 shadow-lg">
                  <h2 className="font-semibold">
                    This place booking on this day:
                  </h2>

                  {infoPlace.bookings.map((book) => (
                    <div className="mt-2" key={book._id}>
                      From {format(book.checkIn, 'dd.MM.yyyy')} to{' '}
                      {format(book.checkOut, 'dd.MM.yyyy')}
                    </div>
                  ))}
                </div>
              )}

              <h2 className="font-semibold text-2xl  tracking-wider">Perks</h2>
              <div className="grid grid-cols-3">
                {infoPlace.perks.map((perk) => (
                  <div key={perk}>
                    {'- '}
                    {perk}
                  </div>
                ))}
              </div>

              <h2 className="font-semibold text-2xl  tracking-wider mt-2">
                Description
              </h2>
              {infoPlace.description}
            </div>
            <BookingWidget infoPlace={infoPlace} />
          </div>

          <div>
            <h3 className="mt-2 font-semibold">Extra Info</h3>
            <p className="text-sm text-gray-800">{infoPlace.extraInfo}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PlacePage;
