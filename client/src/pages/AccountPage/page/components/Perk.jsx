import React from 'react';

const Perk = ({ selected, name, label, children, handlerClick }) => {
  return (
    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={selected.indexOf(name) !== -1}
        onChange={handlerClick}
      />
      {children}
      <span>{label}</span>
    </label>
  );
};

export default Perk;
