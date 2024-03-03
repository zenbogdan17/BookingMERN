import React from 'react';
import { urlServer } from '../../../constants';

const ModalPhoto = ({ isOpen, onClose, selectedPhoto }) => {
  return (
    <div
      className={`fixed inset-0 z-20 overflow-auto ${
        isOpen ? 'block' : 'hidden'
      } bg-black bg-opacity-50`}
      onClick={() => onClose()}
    >
      <span
        className="fixed top-0 right-0 m-5 bg-transparent cursor-pointer z-50"
        onClick={() => onClose()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </span>

      <div className="relative flex justify-center items-center my-3">
        <div className="flex flex-col gap-3 bg-white p-8 rounded-lg">
          {selectedPhoto.map((link, index) => (
            <img
              className={``}
              src={urlServer + '/uploads/' + link}
              alt="photo place"
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalPhoto;
