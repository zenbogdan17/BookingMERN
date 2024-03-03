import React, { useEffect, useState } from 'react';
import Perks from './Perks';
import UploaderPhotos from './UploaderPhotos';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import AccountNav from '../../components/AccountNav';
import Loader from '../../../../components/Loader';

const PlacesForm = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [mainPhoto, setMainPhoto] = useState(addedPhotos[0]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('14:00');
  const [checkOut, setCheckOut] = useState('12:00');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    axios
      .get(`/places/${id}`)
      .then(({ data }) => {
        const {
          title,
          address,
          photos,
          mainPhoto,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        } = data;

        setTitle(title);
        setAddress(address);
        setAddedPhotos(photos);
        setMainPhoto(mainPhoto);
        setDescription(description);
        setPerks(perks);
        setExtraInfo(extraInfo);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setMaxGuests(maxGuests);
        setPrice(price);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const inputLabel = (title, subtitle) => {
    return (
      <>
        <h2 className="text-2xl mt-4">{title}</h2>
        <p className="text-gray-500 text-sm">{subtitle}</p>
      </>
    );
  };

  useEffect(() => {
    if (!mainPhoto) {
      setMainPhoto(addedPhotos[0]);
    }
  }, [addedPhotos, mainPhoto]);

  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();

      const placeData = {
        title,
        address,
        photos: addedPhotos,
        mainPhoto,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      };

      const isCorrectData = Object.values(placeData).every((value) =>
        Boolean(value)
      );

      if (!isCorrectData) {
        return toast.error('Form data invalid! Please fill in the fields!');
      }

      let response;

      if (id) {
        response = await axios.put(`/places/${id}`, placeData);
      } else {
        response = await axios.post('/user-places', placeData);
      }

      if (response.status !== 200) throw new Error();

      toast.success('Success!');
      navigate('/account/places');
    } catch (e) {
      toast.error(e.response.data);
      navigate('/');
    } finally {
    }
  };

  return (
    <div>
      <AccountNav />

      {isLoading && <Loader />}

      <form onSubmit={handlerSubmit}>
        {inputLabel(
          'Title',
          'title for your place. should be short and catchy as in advertisement'
        )}
        <input
          type="text"
          placeholder="title, for example: My lovely apt"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {inputLabel('Address', 'Address to this place')}
        <input
          type="text"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {inputLabel('Photos', 'more = better')}
        <UploaderPhotos
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
          mainPhoto={mainPhoto}
          setMainPhoto={setMainPhoto}
        />
        {inputLabel('Description', 'description of the place')}
        <textarea
          className="h-36"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {inputLabel('Perks', 'select all the perks of your place')}
        <div className="grid gap-2 grid-cols-2 mt-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {inputLabel('Extra info', 'house rules, etc')}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {inputLabel(
          'Check in&out times',
          ' add check in and out times, remember to have time window for cleaning the room between guests'
        )}
        <div className="grid gap-2 sm:grid-cols-4 ">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="time"
              placeholder="14:00"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="time"
              placeholder="11:00"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              min={1}
              placeholder="1,2..."
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
            />
          </div>

          <div>
            <h3 className="mt-2 -mb-1">Price</h3>
            <input
              type="number"
              min={0}
              placeholder="100$"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
};

export default PlacesForm;
