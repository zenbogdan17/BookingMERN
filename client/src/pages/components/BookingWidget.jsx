import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { differenceInCalendarDays } from 'date-fns';
import toast from 'react-hot-toast';
import axios from 'axios';

const BookingWidget = ({ infoPlace }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [numberOfNight, setNumberOfNight] = useState();
  const [totalPrice, setTotalPrice] = useState();

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handlerBookingPlace = async () => {
    try {
      if (!user) {
        navigate('/login');
        toast('You need login!', {
          icon: '❗',
        });
      }
      if (!checkIn && !checkOut) {
        return toast.error('Selected checkIn and checkOut');
      }

      const bookings = infoPlace.bookings;

      if (bookings.length > 0) {
        function datesOverlap(date1Start, date1End, date2Start, date2End) {
          return date1Start < date2End && date1End > date2Start;
        }

        const isOverlap = bookings.some((booking) => {
          return datesOverlap(
            new Date(booking.checkIn),
            new Date(booking.checkOut),
            new Date(checkIn),
            new Date(checkOut)
          );
        });

        if (isOverlap) {
          return toast.error('Sorry, the selected dates are already booked');
        }
      }

      const response = await axios.post('/booking', {
        place: infoPlace,
        checkIn,
        checkOut,
        night: numberOfNight,
        numberOfGuests,
        userId: user._id,
        totalPrice,
      });

      setUser(response.data);

      toast.success('You have successfully booked place');
      navigate('/account/booking');
    } catch (e) {
      console.error(e);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    if (checkIn && checkOut) {
      if (checkIn >= checkOut) {
        toast.error('Check-out date must be after check-in date.');
        setNumberOfNight(null);
        return;
      }

      const days = differenceInCalendarDays(
        new Date(checkOut),
        new Date(checkIn)
      );
      if (days < 1) {
        toast.error('Invalid dates. Please select different dates.');
        setNumberOfNight(null);
        return;
      }

      setNumberOfNight(days);
    }
  }, [checkIn, checkOut]);

  useEffect(() => {
    if (numberOfNight) {
      const calculatedPrice = infoPlace.price * numberOfNight;
      const serviceFee = Math.floor(calculatedPrice * 0.15);
      setTotalPrice(calculatedPrice + serviceFee);
    }
  }, [numberOfNight, infoPlace.price]);

  return (
    <div>
      <div className="border shadow-2xl p-6 rounded-2xl">
        <div className="text-2xl font-semibold">
          ${infoPlace.price}
          <span className=" font-light"> /night</span>
        </div>

        <div className="grid grid-cols-2 mt-3">
          <div className="py-4 px-2 border border-gray-900 rounded-ss-2xl">
            <p className="font-semibold text-lg mb-1">Check in</p>
            <input
              className="p-1 rounded-xl w-full"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>

          <div className="py-4 px-2 border border-gray-900 border-l-0 rounded-tr-2xl">
            <p className="font-semibold text-lg mb-1">Check out</p>
            <input
              className="p-1 rounded-xl w-full"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div className="border border-gray-900 border-t-0 rounded-b-2xl px-2 py-4">
          <p className="font-semibold text-lg mb-1">Number of guests</p>
          <div className="flex gap-3">
            <input
              className="p-1 w-full"
              style={{ boxShadow: 'none' }}
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              min={1}
              max={infoPlace.maxGuests}
            />
          </div>
        </div>

        {numberOfNight && (
          <div className="flex flex-col gap-3 mt-5 ">
            <div className="flex justify-between">
              <p>
                ${infoPlace.price} x {numberOfNight} night
              </p>
              <p>${infoPlace.price * numberOfNight}</p>
            </div>

            <div className="flex justify-between">
              <p>Airbnb Service Fee</p>
              <p>${Math.floor(infoPlace.price * numberOfNight * 0.15)}</p>
            </div>

            <span className="border" />

            <div className="flex justify-between font-bold">
              <p>Total price</p>
              <p>${totalPrice}</p>
            </div>
          </div>
        )}

        <button onClick={handlerBookingPlace} className="primary text-xl mt-4">
          Book this place
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
