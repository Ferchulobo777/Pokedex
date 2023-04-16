import React, { useState } from 'react';
import { usePagination } from '../hooks/usePagination';
import PokemonCard from './PokemonCard';

const ByType = ({ getByType }) => {
  const [selectedType, setSelectedType] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const pokemonsPerPage = 21;

  const handleFilterByType = async (event) => {
    const type = event.target.value;
    setSelectedType(type);
    const pokemons = await getByType(type);
    setFilteredPokemons(pokemons);
  };

  const filteredPagination = usePagination(filteredPokemons, pokemonsPerPage);

  return (
    <div className="flex flex-col justify-center items-center mt-8 w-full">
      <p className="text-2xl font-bold mb-2 text-center">Buscar por tipo:</p>
      <select
        value={selectedType}
        onChange={handleFilterByType}
        className="w-1/2 text-xl font-bold rounded-lg shadow-md cursor-pointer text-center border-2 border-black text-zinc-800 input"
      >
        <option value="" className="font-black text-center">
          --Seleccione un tipo--
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
          Planta
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
      <div className="flex flex-col justify-center items-center">
        {filteredPokemons.length > 0 && (
          <div className="flex flex-wrap flex-col gap-6 mt-20 mb-20 mx-6 justify-center items-center">
            <div className="flex flex-wrap flex-row gap-4 mt-5 mb-5 justify-center items-center w-3/4 text-xl font-bold hover:shadow-md hover:shadow-red-500 rounded-lg cursor-pointer">
              {filteredPagination.pages.map((page) => (
                <button
                  key={page}
                  onClick={() => filteredPagination.changePageTo(page)}
                  className={
                    filteredPagination.currentPage === page
                      ? 'text-red-500 font-black text-3xl hover:shadow-md hover:shadow-red-500 rounded-lg'
                      : 'hover:shadow-md hover:shadow-red-500 rounded-lg'
                  }
                >
                  {page}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap flex-row w-full items-baseline justify-around gap-6">
              {filteredPagination.listSlice.map((pokemon) => (
                <PokemonCard key={pokemon.url} pokemonData={pokemon} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ByType;
