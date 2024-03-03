import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Loader from './../../../components/Loader';
import Place from '../../components/Place';

const FavoritesPage = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get('/favorite')
      .then(({ data }) => setFavorites(data))
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, [user.favorites.length]);

  return (
    <>
      {isLoading && <Loader />}

      {favorites.length === 0 && (
        <div>
          <h2 className="font-semibold text-2xl">Favorites</h2>
          <h3 className="mt-4">Create your first favorite list</h3>
          <p className="mt-1 text-gray-500">
            When searching, tap the heart icon to save your favorite homes and
            experiences to your favorites.
          </p>
        </div>
      )}

      {favorites.length !== 0 && (
        <div>
          <h2 className="font-semibold text-2xl text-center">
            List of place you liked
          </h2>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
            {favorites.map((favorite) => (
              <Place data={favorite} favorite key={favorite._id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FavoritesPage;
