import React, { useEffect, useMemo } from 'react';
import {
  Box,
  Center,
  Container,
  SimpleGrid,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { Waypoint } from 'react-waypoint';
import { Pokeball } from 'tabler-icons-react';
import Fuse from 'fuse.js';
import { useInputState } from '@mantine/hooks';

import {
  getPokemonsArray,
  getPokemonsLength,
  getPokemonsLoading,
} from '../selectors';
import {
  PokemonsActionTypes,
  GetPokemonsRequestedAction,
  GetUserPokemonsRequestedAction,
  UserActionTypes,
} from '../actionTypes';
import { withHeader } from '../hocs';
import { PokemonCard } from '../components';
import { useHomeStyles } from '../styles/pages';
import { useTypedDispatch, useTypedSelector } from '../hooks';

const Home = () => {
  const theme = useMantineTheme();
  const dispatch = useTypedDispatch();

  const { cx, classes } = useHomeStyles();

  const pokemonsArray = useTypedSelector(getPokemonsArray);
  const pokemonsLength = useTypedSelector(getPokemonsLength);
  const pokemonsLoading = useTypedSelector(getPokemonsLoading);

  const [searchValue, setSearchValue] = useInputState('');

  const fuse = useMemo(() => new Fuse(pokemonsArray, {
    keys: ['id', 'name'],
    threshold: 0.3,
  }), [pokemonsArray]);

  const filteredPokemonsArray = useMemo(() => {
    if (searchValue === '') return pokemonsArray;
    const result = fuse.search(searchValue);
    return result.map(({ item }) => item);
  }, [searchValue, fuse, pokemonsArray]);

  const getPokemons = (offset: number) => {
    if (pokemonsLoading) return;

    dispatch<GetPokemonsRequestedAction>({
      type: PokemonsActionTypes.GET_POKEMONS_REQUESTED,
      payload: { offset },
    });
  };

  const getSelectedPokemons = () => {
    dispatch<GetUserPokemonsRequestedAction>({
      type: UserActionTypes.GET_USER_POKEMONS_REQUESTED,
    });
  };

  useEffect(() => {
    getPokemons(0);
    getSelectedPokemons();
  }, []);

  return (
    <Box className={classes.wrapper}>
      <Container className={classes.heading} size="xl">
        <Box>
          <TextInput
            value={searchValue}
            onChange={setSearchValue}
            icon={<Pokeball />}
            size="md"
            radius="sm"
            type="search"
            label="Busque por nome ou número"
            placeholder="Ex: Pikachu ou 025"
          />
        </Box>
      </Container>
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
        <Waypoint onEnter={() => getPokemons(pokemonsLength)}>
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
