import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/img/pokeball.png';
import imagenotfound from '../assets/img/imageNotFound.png';

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false); // Nueva variable de estado

  const getPokemonById = async (url) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setLoading(true);
      }, 5000);
    }
  };

  const loadPokemon = async () => {
    const pokemonInfo = await getPokemonById(pokemonData.url);

    setPokemon(pokemonInfo);
    setLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  const tiposPokemonEspanol = {
    alltypes: 'Todos los tipos',
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

  let tipoPokemon = '';
  if (pokemon) {
    tipoPokemon = tiposPokemonEspanol[pokemon.types[0].type.name];
  }
  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`);
  };
  useEffect(() => {
    const loadPokemon = async () => {
      const pokemonInfo = await getPokemonById(pokemonData.url);
      setPokemon(pokemonInfo);
      setLoading(false);
      setLoaded(true);
      // establecer loaded en true después de cargar los datos
    };
    loadPokemon();
  }, [pokemonData.url]);

  return (
    <>
      {pokemon && (
        <article
          onClick={handleClickNavigate}
          className={`w-80 p-4 card cursor-pointer bg bg${pokemon?.types[0].type.name}`}
        >
          <header className={`bg bg${pokemon?.types[0].type.name} rounded-xl`}>
            <motion.div
              className={`bg bg${pokemon?.types[0].type.name} card w-60 h-60 flex hover:saturate-200 hover:rounded-full hover:transform hover:scale-125 justify-center items-center mt-2`}
              style={{ margin: 'auto' }}
            >
              {loading || !loaded ? (
                <img src={loader} className="loader" alt="loader" />
              ) : (
                <motion.img
                  layout
                  src={
                    pokemon?.sprites.other['official-artwork'].front_default
                      ? pokemon?.sprites.other['official-artwork'].front_default
                      : imagenotfound
                  }
                  className="pokemon-img"
                  alt="logo"
                />
              )}
            </motion.div>
          </header>

          <section>
            <section>
              <h2 className="text-2xl capitalize font-bold text-center mt-6 text-slate-900">
                {pokemon?.name}
              </h2>
              <p className="text-center font-semibold mt-2 text-lg">{tipoPokemon}</p>
              <p className="text-xl capitalize font-bold text-center mt-0 text-slate-900">
                Tipo
              </p>
            </section>

            <section className="flex flex-wrap flex-row gap-8 mt-4 justify-between">
              {pokemon.stats.map((stat) => (
                <section key={stat.stat.name}>
                  <h3 className="text-xl font-bold">{stat.stat.name.toUpperCase()}</h3>
                  <p className="text-center font-bold text-lg">{stat.base_stat}</p>
                </section>
              ))}
            </section>
          </section>
        </article>
      )}
    </>
  );
};
export default PokemonCard;
