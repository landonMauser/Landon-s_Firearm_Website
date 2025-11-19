import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function WeaponButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/m1carbine')}
      className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
    >
      M1 Carbine
    </button>
  );
}
