import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './../../../components/Loader';
import { Link } from 'react-router-dom';
import { urlServer } from '../../../../constants';
import { format } from 'date-fns';
import { UserContext } from '../../../context/UserContext';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [settingsIsVisibility, setSettingsIsVisibility] = useState();

  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get('/user-booking')
      .then(({ data }) => setBookings(data))
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

  const handlerRemoveBooking = async (index) => {
    const response = await axios.delete(
      `/booking/${bookings[index].bookingId}`
    );

    setUser(response.data);

    setBookings((prev) => prev.filter((_, i) => i !== index));
    setSettingsIsVisibility(null);
  };

  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && bookings.length === 0 && (
        <div className="text-center">
          <h2 className=" font-semibold text-xl">
            You do not have a reservation
          </h2>

          <div className="mt-6">
            <Link to={'/'} className=" bg-primary text-white p-4 rounded-2xl ">
              You can add any booking
            </Link>
          </div>
        </div>
      )}

      {bookings.length > 0 &&
        bookings.map((place, index) => (
          <div
            className="flex gap-4 p-4 mb-4 bg-gray-200 rounded-2xl shadow-xl relative "
            key={place._id}
          >
            <div>
              {place.photos.length && (
                <Link className="relative" to={`/place/${place._id}`}>
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
                </Link>
              )}
            </div>

            <div className="flex flex-col gap-1 h-full w-full grow-0 shrink">
              <h2 className="text-xl"> {place.title}</h2>

              <div className="flex gap-2">
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
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
                {format(place.checkIn, 'dd.MM.yyyy')}

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
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>

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
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
                {format(place.checkOut, 'dd.MM.yyyy')}
              </div>

              <div className="flex gap-2">
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
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
                {place.night} night
              </div>

              <div className="flex justify-between">
                <p className="text-lg">
                  Address:{' '}
                  <span className=" font-semibold"> {place.address}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center text-center bg-primary text-white rounded-2xl text-xl p-4 ">
              Total price: ${place.totalPrice}
            </div>

            <div
              className="cursor-pointer"
              onClick={() => {
                if (settingsIsVisibility === index) {
                  setSettingsIsVisibility(null);
                } else {
                  setSettingsIsVisibility(index);
                }
              }}
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
                  d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
              </svg>
            </div>

            {settingsIsVisibility === index && (
              <div className="absolute bg-gray-100 rounded-xl p-3 shadow-2xl right-1 top-11">
                <p
                  className="text-primary cursor-pointer"
                  onClick={() => handlerRemoveBooking(index)}
                >
                  Remove
                </p>
              </div>
            )}
          </div>
        ))}
    </>
  );
};

export default MyBookings;
