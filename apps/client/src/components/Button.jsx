import React from 'react';

export default function Button({ content, color = 'primary' }) {
  return (
    <button
      type="submit"
      className={`bg-${color} w-full text-${color == 'primary' ? 'white' : 'primary'} rounded-xl py-5 text-xl font-bold`}
    >
      {content}
    </button>
  );
}
