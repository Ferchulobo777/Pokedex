import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadPokemon = async () => {
    const pokemonInfo = await getPokemonById(pokemonData.url);

    setPokemon(pokemonInfo);
    setLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

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

  let tipoPokemon = '';
  if (pokemon) {
    tipoPokemon = tiposPokemonEspanol[pokemon.types[0].type.name];
  }
  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`);
  };

  return (
    <>
      {pokemon && (
        <article
          onClick={handleClickNavigate}
          className={`w-80 p-4 card cursor-pointer bg bg${pokemon?.types[0].type.name}`}
        >
          <header
            className={`bg bg${pokemon?.types[0].type.name} border-2 card rounded-xl`}
          >
            <motion.div className="w-40 h-40 flex hover:saturate-200 items-center justify-center mx-14 hover:rounded-full hover:transform hover:scale-125 mt-2">
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
          </header>

          <section>
            <section>
              <h2 className="text-2xl capitalize font-semibold text-center mt-6">
                {pokemon?.name}
              </h2>
              <p className="text-center font-semibold mt-2 text-lg">{tipoPokemon}</p>
              <p className="text-center font-bold mt-2">Tipo</p>
            </section>

            <section className="flex flex-wrap flex-row gap-8 mt-4 justify-between">
              {pokemon.stats.map((stat) => (
                <section key={stat.stat.name}>
                  <h3 className="underline underline-offset-2 font-bold">
                    {stat.stat.name.toUpperCase()}
                  </h3>
                  <p className="text-center">{stat.base_stat}</p>
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
