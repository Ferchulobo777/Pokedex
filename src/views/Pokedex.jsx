import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import ByType from '../components/ByType';
import { usePagination } from '../hooks/usePagination';

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [setLoading] = useState(false);
  const pokemonsPagination = usePagination(
    pokemons.length > 0
      ? pokemons.filter((pokemon) => {
          return pokemon.name.includes(searchTerm.toLowerCase());
        })
      : [],
    21,
  );
  const getAllPokemons = async () => {
    try {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1300');
      return res.data.results;
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  const getByType = async (type) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
      return res.data.pokemon.map((p) => p.pokemon);
    } catch (error) {
      console.error(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  };

  const loadAllPokemons = async () => {
    const allPokemons = await getAllPokemons();

    setPokemons(allPokemons);
  };

  useEffect(() => {
    loadAllPokemons();
  }, [loadAllPokemons]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResetSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="w-full relative text-center top-52 text-black font-bold text-4xl light">
        Hola entrenador <span className="text-red-500 user">{user} </span>Bienvenido a tu
        Pokedex
      </p>

      <input
        className="mt-60 flex w-1/2 h-10 text-xl rounded-lg input p-3 placeholder:text-gray-400 font-black placeholder:text-center border-2 border-black"
        type="text"
        placeholder="Busca aqui tu pokemon"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="flex flex-row flex-wrap gap-12 justify-between">
        <button
          className="mt-8 bg-blue-500 w-28 h-12 text-lg font-bold rounded-lg hover:saturate-200 hover:transform hover:scale-110 hover:shadow hover:shadow-white shadow shadow-blue-500 border border-white"
          onClick={() => (window.location.href = '/')}
        >
          Inicio
        </button>
        <button
          className="bg-red-500 mt-8 w-28 h-12 text-lg font-bold rounded-lg hover:saturate-200 hover:transform hover:scale-110 hover:shadow hover:shadow-white shadow shadow-red-500 border border-white"
          onClick={handleResetSearch}
        >
          Borrar
        </button>
      </div>
      <ByType getByType={getByType} />
      <div className="flex flex-wrap flex-row gap-4 mt-20 justify-center w-3/4 text-xl font-bold hover:shadow-md hover:shadow-red-500 rounded-lg cursor-pointer">
        {pokemonsPagination.pages.map((page) => (
          <button
            key={page}
            onClick={() => pokemonsPagination.changePageTo(page)}
            className={
              pokemonsPagination.currentPage === page
                ? 'text-red-500 font-black text-4xl hover:saturate-200'
                : ''
            }
          >
            {page}
          </button>
        ))}
      </div>

      <section className="flex flex-wrap flex-row gap-6 mt-20 mb-20 mx-6 justify-evenly">
        {pokemonsPagination.listSlice.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonData={pokemon} />
        ))}
      </section>
    </div>
  );
};

export default Pokedex;
