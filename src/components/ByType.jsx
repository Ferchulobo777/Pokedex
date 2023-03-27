import React, { useState } from 'react';

const ByType = ({ getByType }) => {
  const [type, setType] = useState('');

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleFilterByType = async () => {
    const pokemonsByType = await getByType(type);

    console.log(pokemonsByType); // Aquí puedes hacer lo que quieras con los pokemons filtrados por tipo
  };

  return (
    <div className="mt-6 flex flex-row items-center justify-center gap-4 mx-6">
      <span className="text-xl font-bold">Buscar por tipo:</span>
      <select
        className="rounded-lg w-40 h-10 text-sm text-center border-2 border-black text-gray-900 font-black select"
        value={type}
        onChange={handleTypeChange}
      >
        <option value="" className="font-black text-center">
          Seleccione un tipo
        </option>
        <option value="normal" className="font-black text-rose-300">
          Normal
        </option>
        <option value="fire" className="font-black text-red-500">
          Fuego
        </option>
        <option value="water" className="font-black text-blue-500">
          Agua
        </option>
        <option value="electric" className="font-black text-yellow-300">
          Eléctrico
        </option>
        <option value="grass" className="font-black text-teal-500">
          Hierba
        </option>
        <option value="ice" className="font-black text-cyan-500">
          Hielo
        </option>
        <option value="fighting" className="font-black text-rose-900">
          Lucha
        </option>
        <option value="poison" className="font-black text-violet-500">
          Veneno
        </option>
        <option value="ground" className="font-black text-orange-900">
          Tierra
        </option>
        <option value="flying" className="font-black text-blue-300">
          Volador
        </option>
        <option value="psychic" className="font-black text-pink-700">
          Psíquico
        </option>
        <option value="bug" className="font-black text-green-500">
          Bicho
        </option>
        <option value="rock" className="font-black text-gray-500">
          Roca
        </option>
        <option value="ghost" className="font-black text-fuchsia-400">
          Fantasma
        </option>
        <option value="dragon" className="font-black text-blue-900">
          Dragón
        </option>
        <option value="dark" className="font-black text-zinc-900">
          Siniestro
        </option>
        <option value="steel" className="font-black text-zinc-600">
          Acero
        </option>
        <option value="fairy" className="font-black text-pink-400">
          Hada
        </option>
      </select>
      <button
        className="bg-green-500 text-white rounded-lg px-4 py-2 text-xl font-bold hover:saturate-200 hover:transform hover:scale-110 hover:shadow hover:shadow-white"
        onClick={handleFilterByType}
      >
        Buscar
      </button>
    </div>
  );
};

export default ByType;
