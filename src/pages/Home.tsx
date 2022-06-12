import React, { useEffect, useMemo } from 'react';
import {
  Box,
  Center,
  Container,
  SimpleGrid,
  useMantineTheme,
} from '@mantine/core';
import { Waypoint } from 'react-waypoint';
import { Pokeball } from 'tabler-icons-react';
import Fuse from 'fuse.js';
import { useInputState } from '@mantine/hooks';

import { getPokemonsArray, getPokemonsLoading } from '../selectors';
import {
  PokemonsActionTypes,
  GetPokemonsRequestedAction,
  GetPokemonRequestedAction,
} from '../actionTypes';
import { withHeader } from '../hocs';
import { PageHeading, PokemonCard } from '../components';
import { useHomeStyles } from '../styles/pages';
import { useTypedDispatch, useTypedSelector } from '../hooks';

const Home = () => {
  const theme = useMantineTheme();
  const dispatch = useTypedDispatch();

  const { cx, classes } = useHomeStyles();

  const pokemonsArray = useTypedSelector(getPokemonsArray);
  const pokemonsLoading = useTypedSelector(getPokemonsLoading);

  const [searchValue, setSearchValue] = useInputState('');

  const fuse = useMemo(() => new Fuse(pokemonsArray, {
    keys: ['formattedId', 'name'],
    threshold: 0.2,
  }), [pokemonsArray]);

  const filteredPokemonsArray = useMemo(() => {
    if (searchValue === '') return pokemonsArray;

    const result = fuse.search(searchValue.toLowerCase());
    return result.map(({ item }) => item);
  }, [searchValue, fuse, pokemonsArray]);

  const getPokemons = () => {
    if (pokemonsLoading) return;

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
    <Box className={classes.wrapper}>
      <PageHeading
        title="Pokemons"
        searchValue={searchValue}
        setSearchValue={setSearchValue}
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
          <Center py="xs">
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
