import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  Container,
  SimpleGrid,
  useMantineTheme,
} from '@mantine/core';
import { Waypoint } from 'react-waypoint';
import { Pokeball } from 'tabler-icons-react';

import { getPokemonsArray, getPokemonsLoading } from '../selectors';
import {
  PokemonsActionTypes,
  GetPokemonsRequestedAction,
  GetPokemonRequestedAction,
} from '../actionTypes';
import { withHeader } from '../hocs';
import { PageHeading, PokemonCard } from '../components';
import { useHomeStyles } from '../styles/pages';
import { useFilter, useTypedDispatch, useTypedSelector } from '../hooks';

const Home = () => {
  const dispatch = useTypedDispatch();

  const theme = useMantineTheme();
  const { cx, classes } = useHomeStyles();

  const pokemonsArray = useTypedSelector(getPokemonsArray);
  const pokemonsLoading = useTypedSelector(getPokemonsLoading);

  const [searchValue, setSearchValue] = useState('');

  const filteredPokemonsArray = useFilter(pokemonsArray, searchValue, {
    keys: ['formattedId', 'name'],
    threshold: 0.2,
  });

  const getPokemons = () => {
    if (pokemonsLoading || searchValue !== '') return;

    dispatch<GetPokemonsRequestedAction>({
      type: PokemonsActionTypes.GET_POKEMONS_REQUESTED,
    });
  };

  const getPokemon = (query: string | number) => {
    dispatch<GetPokemonRequestedAction>({
      type: PokemonsActionTypes.GET_POKEMON_REQUESTED,
      payload: { query },
    });
  };

  // useEffect(() => {
  //   getPokemons();
  // }, []);

  useEffect(() => {
    if (filteredPokemonsArray.length === 0 && searchValue !== '') {
      getPokemon(searchValue.toLowerCase());
    }
  }, [filteredPokemonsArray, searchValue]);

  return (
    <Box>
      <PageHeading
        title="Pokemons"
        setValue={setSearchValue}
      />
      <Container size="xl">
        <SimpleGrid
          cols={5}
          spacing="xl"
          breakpoints={[
            { maxWidth: theme.breakpoints.xl, cols: 5 },
            { maxWidth: theme.breakpoints.lg, cols: 4 },
            { maxWidth: theme.breakpoints.md, cols: 3 },
            { maxWidth: theme.breakpoints.sm, cols: 2 },
            { maxWidth: theme.breakpoints.xs, cols: 1 },
          ]}
        >
          {filteredPokemonsArray.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </SimpleGrid>
        <Waypoint onEnter={getPokemons}>
          <Center py="sm">
            <Pokeball
              className={cx(classes.pokeball, {
                [classes.pokeballLoading]: pokemonsLoading,
              })}
              size={30}
              color="#A0A0A0"
            />
          </Center>
        </Waypoint>
      </Container>
    </Box>
  );
};

export const HomePage = withHeader(Home);
