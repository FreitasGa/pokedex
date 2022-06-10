import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Image } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';

import { Pokemon } from '../types';
import { usePokemonModalStyles } from '../styles/components';
import { ActionTypes, GetPokemonRequestedAction } from '../actionTypes';
import pokeballBackground from '../assets/pokeballBackground.png';

type PokemonModalProps = {
  pokemon: Pokemon;
};

export const PokemonModal = (props: ContextModalProps<PokemonModalProps>) => {
  const {
    innerProps: { pokemon },
  } = props;

  const dispatch = useDispatch();
  const { classes } = usePokemonModalStyles();

  useEffect(() => {
    dispatch<GetPokemonRequestedAction>({
      type: ActionTypes.GET_POKEMON_REQUESTED,
      payload: { id: pokemon.id },
    });
  }, []);

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.upperWrapper}>
        <Box className={classes.imageWrapper}>
          <Image className={classes.imageBackground} src={pokeballBackground} />
          <Image
            className={classes.image}
            src={pokemon.image}
            alt={pokemon.name}
          />
        </Box>
      </Box>
    </Box>
  );
};
