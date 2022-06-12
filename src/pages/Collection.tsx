import React, { useEffect, useMemo } from 'react';
import {
  Box,
  Center,
  Container,
  SimpleGrid,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import Fuse from 'fuse.js';
import { Pokeball } from 'tabler-icons-react';

import { withHeader } from '../hocs';
import { useTypedDispatch, useTypedSelector } from '../hooks';
import {
  getPokemonsArray,
  getPokemonsLoading,
  getUserPokemonsIds,
} from '../selectors';
import { PageHeading, PokemonCard } from '../components';
import { useCollectionStyles } from '../styles/pages';
import { GetPokemonsByIdsRequestedAction, PokemonsActionTypes } from '../actionTypes';

const Collection = () => {
  const dispatch = useTypedDispatch();
  const theme = useMantineTheme();
  const { cx, classes } = useCollectionStyles();

  const pokemonsArray = useTypedSelector(getPokemonsArray);
  const pokemonsLoading = useTypedSelector(getPokemonsLoading);
  const userPokemonsIds = useTypedSelector(getUserPokemonsIds);

  const [searchValue, setSearchValue] = useInputState('');

  const userPokemonsArray = useMemo(() => (
    pokemonsArray.filter((pokemon) => userPokemonsIds.includes(pokemon.id))
  ), [pokemonsArray, userPokemonsIds]);

  const fuse = useMemo(() => new Fuse(userPokemonsArray, {
    keys: ['formattedId', 'name'],
    threshold: 0.2,
  }), [userPokemonsArray]);

  const filteredUserPokemonsArray = useMemo(() => {
    if (searchValue === '') return userPokemonsArray;

    const result = fuse.search(searchValue.toLowerCase());
    return result.map(({ item }) => item);
  }, [searchValue, fuse, userPokemonsArray]);

  const getPokemonsByIds = () => {
    dispatch<GetPokemonsByIdsRequestedAction>({
      type: PokemonsActionTypes.GET_POKEMONS_BY_IDS_REQUESTED,
    });
  };

  useEffect(() => {
    getPokemonsByIds();
  }, []);

  return (
    <Box className={classes.wrapper}>
      <PageHeading
        title="Sua Coleção"
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
          {filteredUserPokemonsArray.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </SimpleGrid>
        {userPokemonsIds.length === 0 && (
          <Center py="xs">
            <Text align="center">
              Você ainda não tem nenhum Pokémon
              <br />
              Adicione um Pokémon para começar
            </Text>
          </Center>
        )}
        {(
          pokemonsLoading
          || (userPokemonsIds.length > 0 && pokemonsArray.length === 0)
        ) && (
          <Center py="xs">
            <Pokeball
              className={cx(classes.pokeball, {
                [classes.pokeballLoading]: pokemonsLoading
                || (userPokemonsIds.length > 0 && pokemonsArray.length === 0),
              })}
              size={30}
              color="#A0A0A0"
            />
          </Center>
        )}
      </Container>
    </Box>
  );
};

export const CollectionPage = withHeader(Collection);
