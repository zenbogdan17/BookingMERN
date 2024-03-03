import React from 'react';
import { BeatLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <BeatLoader color="#f5385d" />
    </div>
  );
};

export default Loader;
