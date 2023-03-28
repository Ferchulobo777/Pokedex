import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const getPokemonById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPokemonById(id);
      setPokemon(data);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <section className="flex justify-center w-full">
      <header
        className={`bg bg${pokemon?.types[0].type.name} flex flex-col justify center border-2 card rounded-xl mt-48 mb-60 w-5/6 h-screen`}
      >
        <h1 className="text-center mt-8">Pokemon Detail</h1>

        <motion.div
          className={`bg bg${pokemon?.types[0].type.name} card w-96 h-96 flex hover:saturate-200 hover:rounded-full hover:transform hover:scale-125 mt-12 justify-center items-center`}
          style={{ margin: 'auto' }}
        >
          {loading ? (
            <img
              className=""
              src={`../assets/img/pokeball.png`}
              className="loader"
              alt="loader"
            />
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
        <p className="text-center mt-2">N° {id} </p>
      </header>
    </section>
  );
};

export default PokemonDetail;
