import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from './../components/Loader';
import Place from './components/Place';
import toast from 'react-hot-toast';

const MainPage = () => {
  const [places, setPlaces] = useState(null);

  useEffect(() => {
    axios
      .get('places')
      .then(({ data }) => setPlaces(data))
      .catch(() => toast.error('Something went wrong'));
  }, []);

  return (
    <>
      {places ? (
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {places.map((place) => (
            <Place data={place} key={place._id} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MainPage;
