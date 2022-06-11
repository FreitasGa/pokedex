import { TypeName } from '../types';

export const colorByType = (type: TypeName) => {
  const colors = {
    bug: '#A6B91A',
    dragon: '#6F35FC',
    electric: '#F7D02C',
    fairy: '#D685AD',
    fighting: '#C22E28',
    fire: '#EE8130',
    flying: '#A98FF3',
    grass: '#7AC74C',
    ground: '#E2BF65',
    ice: '#96D9D6',
    normal: '#A8A77A',
    poison: '#A33EA1',
    psychic: '#F95587',
    rock: '#B6A136',
    steel: '#B7B7CE',
    water: '#6390F0',
    ghost: '#735797',
    dark: '#705746',
  };

  return colors[type];
};

export const backgroundColorByType = (type: TypeName) => {
  const backgroundColors = {
    bug: '#ecf4b0',
    dragon: '#d4c2fe',
    electric: '#fdf1c0',
    fairy: '#f3dae6',
    fighting: '#f1bcba',
    fire: '#fad9c1',
    flying: '#e5ddfb',
    grass: '#d7eec9',
    ground: '#f6ecd1',
    ice: '#dff4f3',
    normal: '#e5e5d7',
    poison: '#e7c1e7',
    psychic: '#fdccdb',
    rock: '#ece5c0',
    steel: '#e9e9f0',
    water: '#d0defa',
    ghost: '#d5cbe1',
    dark: '#d9ccc2',
  };

  return backgroundColors[type];
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
