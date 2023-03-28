import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

const getPokemonById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const getPokemonNameById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    return res.data.names.find((name) => name.language.name === 'en').name;
  } catch (error) {
    console.error(error);
  }
};

const getPokemonStatsById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.data.stats;
  } catch (error) {
    console.error(error);
  }
};

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonById(id);
      const name = await getPokemonNameById(id);
      const stats = await getPokemonStatsById(id);
      setPokemon(data);
      setPokemonName(name);
      setStats(stats);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const tiposPokemonEspanol = {
    normal: 'Normal',
    fighting: 'Lucha',
    flying: 'Volador',
    poison: 'Veneno',
    ground: 'Tierra',
    rock: 'Roca',
    bug: 'Bicho',
    ghost: 'Fantasma',
    steel: 'Acero',
    fire: 'Fuego',
    water: 'Agua',
    grass: 'Planta',
    electric: 'Eléctrico',
    psychic: 'Psíquico',
    ice: 'Hielo',
    dragon: 'Dragón',
    dark: 'Siniestro',
    fairy: 'Hada',
  };

  const calculateStatPercentage = (statValue) => {
    const maxStatValue = 255; // Máximo valor de estadística de cualquier Pokémon
    return (statValue / maxStatValue) * 100;
  };

  return (
    <section className="flex justify-center w-full">
      <Link to="/pokedex" className="absolute left-6 top-36 p-4">
        <FaChevronLeft size={40} />
      </Link>
      <header
        className={`bg bg${pokemon?.types[0].type.name} flex flex-col justify center border-2 card rounded-xl mt-48 mb-20 w-5/6 h-full`}
      >
        <h1 className="text-4xl text-center mt-8 font-black flex justify-center">
          {pokemonName}
        </h1>
        <p
          className="text-center mt-4 mb-16 text-xl font-bold bg-green-500 w-20 h-10 flex justify-center items-center justify-self-center rounded-md hover:saturate-200"
          style={{ margin: 'auto', marginBottom: '65px', marginTop: '40px' }}
        >
          N° {id}{' '}
        </p>
        <motion.div
          className={`bg bg${pokemon?.types[0].type.name} card w-96 h-96 flex hover:saturate-200 hover:rounded-full hover:transform hover:scale-125 mt-32 justify-center items-center`}
          style={{ margin: 'auto' }}
        >
          {loading ? (
            <img src={`../assets/img/pokeball.png`} className="loader" alt="loader" />
          ) : (
            <motion.img
              layout
              src={
                pokemon?.sprites.other['official-artwork'].front_default
                  ? pokemon?.sprites.other['official-artwork'].front_default
                  : '../assets/img/imageNotFound.png'
              }
              className="pokemon-img"
              alt="logo"
            />
          )}
        </motion.div>
        <div className="flex flex-row flex-wrap gap-20 justify-center mt-12">
          <div className="flex flex-col">
            <p className="text-center mt-4 mb-4 font-bold text-2xl">Peso</p>
            <p className="text-center text-lg font-semibold">{pokemon?.weight} kg</p>
          </div>
          <div className="flex flex-col">
            <p className="text-center mt-4 mb-4 font-bold text-2xl">Altura</p>
            <p className="text-center text-lg font-semibold">{pokemon?.height / 10} m</p>
          </div>
        </div>
        <hr
          className={`bg bg${pokemon?.types[0].type.name} card w-3/4 flex hover:saturate-200 justify-center items-center mx-auto mt-6 mb-4`}
        />
        <p className="text-center mt-4 mb-4 font-bold text-2xl">Tipo</p>
        <div className="flex justify-center text-xl font-bold mb-8 mt-2">
          {pokemon?.types.map((type) => (
            <div
              key={type.slot}
              className={`bg bg${pokemon?.types[0].type.name} card w-28 h-16 flex hover:saturate-200 justify-center items-center mx-6`}
            >
              {tiposPokemonEspanol[type.type.name]}
            </div>
          ))}
        </div>
        <hr
          className={`bg bg${pokemon?.types[0].type.name} card w-3/4 flex hover:saturate-200 justify-center items-center mx-auto mt-10 mb-4`}
        />
        <div>
          <h2 className="text-center mt-4 font-bold text-2xl mb-4">Habilidades</h2>
          <div className="flex flex-wrap justify-center">
            {pokemon?.abilities.map((ability) => (
              <p
                key={ability.ability.name}
                className={`bg bg${pokemon?.types[0].type.name} card w-40 h-16 flex hover:saturate-200 justify-center items-center mx-8 mt-4 mb-4`}
              >
                {ability.ability.name}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <hr
            className={`bg bg${pokemon?.types[0].type.name} card w-3/4 flex hover:saturate-200 justify-center items-center mx-auto mt-16 mb-4`}
          />
          <h2 className="text-center mt-4 mb-4 font-bold text-2xl">Estadisticas</h2>

          <ul className="text-center font-bold text-xl mb-2 flex justify-center flex-col capitalize">
            {stats?.map((stat, index) => (
              <li className="mt-2 mb-2" key={index}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </section>
  );
};

export default PokemonDetail;
