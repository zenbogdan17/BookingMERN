import axios from 'axios';
import React, { useState } from 'react';
import { urlServer } from '../../../../../constants';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const UploaderPhotos = ({
  addedPhotos,
  setAddedPhotos,
  mainPhoto,
  setMainPhoto,
}) => {
  const [photoLink, setPhotoLink] = useState('');

  const { id } = useParams();

  const addPhotoByLink = async (e) => {
    e.preventDefault();

    if (!photoLink) {
      return toast.error('Add link to photo');
    }

    const { data: filename } = await axios.post('/upload-by-link', {
      link: photoLink,
    });

    setAddedPhotos((prev) => [...prev, filename]);
    setPhotoLink('');
  };

  const uploadPhoto = async (e) => {
    const files = e.target.files;

    const formData = new FormData();

    if (id) {
      formData.append('id', id);
    }

    for (let i = 0; i < files.length; i++) {
      formData.append('photos', files[i]);
    }

    const { data: filenames } = await axios.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setAddedPhotos((prev) => [...prev, ...filenames]);
  };

  const handlerRemovePhoto = async (link) => {
    try {
      if (mainPhoto === link) {
        return toast.error('Select new main photo to delete this one');
      }

      const response = await axios.delete('/delete_photo', {
        data: {
          namePhoto: link,
          idPlace: id,
        },
      });

      setAddedPhotos([...addedPhotos.filter((photo) => photo !== link)]);

      if (response) toast.success('Photo success delete');
    } catch (e) {
      toast.error(e?.response?.data);

      console.error('Error fetching data:', e.response.data);
    }
  };

  const handlerChangeMeinPhoto = (link) => {
    setMainPhoto(link);

    toast.success('You change the main photo place');
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add using a link  ...jpg"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
        />
        <button
          className="bg-gray-200 px-4 rounded-2xl"
          onClick={addPhotoByLink}
        >
          Add&nbsp;photo
        </button>
      </div>

      <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div key={link} className="relative">
              <img
                className="rounded-md cursor-pointer h-48 w-96 object-cover"
                src={urlServer + '/uploads/' + link}
                alt="photo_room"
              />
              <div
                className="absolute bottom-2 right-2 p-2 bg-slate-200 rounded-full cursor-pointer shadow-lg opacity-80 hover:scale-110"
                onClick={() => handlerRemovePhoto(link)}
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
              {mainPhoto === link ? (
                <div className="absolute bottom-2 right-16 p-2 bg-slate-200 rounded-full cursor-pointer shadow-lg opacity-100  hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ) : (
                <div
                  className="absolute bottom-2 right-16 p-2 bg-slate-200 rounded-full cursor-pointer shadow-lg opacity-80  hover:scale-110"
                  onClick={() => handlerChangeMeinPhoto(link)}
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
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        <label className="flex justify-center items-center gap-2 text-2xl font-semibold border bg-transparent rounded-2xl cursor-pointer h-48 w-51">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
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
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default UploaderPhotos;
