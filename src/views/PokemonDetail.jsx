import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

  return (
    <div>
      <h1 className="mt-60">Pokemon Detail</h1>
      <p>El id del Selecionado es: {id} </p>
    </div>
  );
};

export default PokemonDetail;
