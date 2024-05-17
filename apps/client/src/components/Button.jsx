import React from 'react';

export default function Button({ content, color = 'primary' }) {
  return (
    <button type="submit" className={`bg-${color} w-full text-white rounded-xl py-3`}>
      {content}
    </button>
  );
}
