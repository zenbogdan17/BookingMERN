import React, { useState } from 'react';
import { urlServer } from '../../../constants';
import ModalPhoto from './ModalPhoto';

const PlacePhotos = ({ mainPhoto, allPhoto }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState([]);

  const handlerClickOnPhoto = (link) => {
    setIsOpenModal(true);
    setSelectedPhoto(link);
  };

  return (
    <>
      <ModalPhoto
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(!isOpenModal)}
        selectedPhoto={selectedPhoto}
      />

      <div
        className={`grid ${
          allPhoto.length > 3 ? 'grid-cols-[2fr_1fr]' : 'grid-cols-2'
        }  lg:grid-cols-2 gap-1 lg:gap-x-2 mt-5 relative`}
      >
        <div className="">
          <img
            className="aspect-square object-cover cursor-pointer hover:brightness-75 rounded-l-2xl"
            src={urlServer + '/uploads/' + mainPhoto}
            alt="main photo place"
            onClick={() => handlerClickOnPhoto([mainPhoto])}
          />
        </div>
        {allPhoto.length === 3 || allPhoto.length === 2 ? (
          <>
            <div className="">
              <img
                className="aspect-square object-cover cursor-pointer hover:brightness-75 rounded-r-2xl"
                src={urlServer + '/uploads/' + allPhoto[1]}
                alt="photo place"
                onClick={() => handlerClickOnPhoto([allPhoto[1]])}
              />
            </div>

            <span
              className={`${
                allPhoto.length === 3 ? 'block' : 'hidden'
              } absolute right-3 bottom-3 bg-white py-2 px-4 rounded-2xl border-2 border-gray-500 cursor-pointer hover:scale-95`}
              onClick={() => handlerClickOnPhoto(allPhoto)}
            >
              Show all photos
            </span>
          </>
        ) : (
          <>
            <div className="grid grid-row-2 lg:hidden">
              {allPhoto
                .filter((link) => link !== mainPhoto)
                .slice(0, 2)
                .map((link, index) => (
                  <img
                    className={`aspect-square object-cover cursor-pointer col-span-1 row-span-1 hover:brightness-75 
              ${index === 1 && 'pt-1'} ${index === 0 && 'rounded-tr-2xl'} ${
                      index === 1 && 'rounded-br-2xl'
                    }`}
                    src={urlServer + '/uploads/' + link}
                    alt="photo place"
                    key={index}
                    onClick={() => handlerClickOnPhoto([link])}
                  />
                ))}
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-2">
              {allPhoto
                .filter((link) => link !== mainPhoto)
                .slice(0, 4)
                .map((link, index) => (
                  <img
                    className={`aspect-square object-cover cursor-pointer col-span-1 row-span-1 hover:brightness-75 ${
                      index === 3 && 'rounded-ee-2xl'
                    }  ${index === 1 && 'rounded-tr-2xl'}`}
                    src={urlServer + '/uploads/' + link}
                    alt="photo place"
                    key={index}
                    onClick={() => handlerClickOnPhoto([link])}
                  />
                ))}
            </div>
            <span
              className={`${allPhoto.length >= 3 ? 'block' : 'hidden'} lg:${
                allPhoto.length > 5 ? 'block' : 'hidden'
              } absolute right-3 bottom-3 bg-white py-2 px-4 rounded-2xl border-2 border-gray-500 cursor-pointer hover:scale-95`}
              onClick={() => handlerClickOnPhoto(allPhoto)}
            >
              Show all photos
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default PlacePhotos;
