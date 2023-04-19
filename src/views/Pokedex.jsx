import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import { usePagination } from '../hooks/usePagination';

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
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
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=2000');
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
  const loadPokemonsByType = async () => {
    if (selectedType) {
      const pokemonsByType = await getByType(selectedType);
      setPokemons(pokemonsByType);
    } else {
      loadAllPokemons();
    }
  };

  useEffect(() => {
    loadPokemonsByType();
  }, [selectedType]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResetSearch = () => {
    setSearchTerm('');
  };
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="w-full relative text-center top-52 text-black font-bold text-4xl light">
        Hola entrenador <span className="text-red-500 user">{user} </span>Bienvenido a tu
        Pokedex
      </p>

      <input
        className="mt-60 flex w-3/4 md:w-1/2 h-10 text-xl rounded-lg input p-3 placeholder:text-gray-400 font-black placeholder:text-center border-2 border-black"
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
      <div className="mt-5 mb-5 w-full mx-auto flex justify-center items-center">
        <select
          className="w-3/4 md:w-1/2 text-center text-gray-500 h-12 text-lg rounded-lg input p-3 placeholder:text-gray-400 font-black placeholder:text-center border border-black"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option className="font-black text-black-300" value="">
            Selecciona un tipo
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
      </div>
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
