import React, { useEffect } from 'react';
import {
  ActionIcon,
  Badge,
  Box,
  Center,
  CloseButton,
  Divider,
  Group,
  Image,
  ScrollArea,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { Pokeball } from 'tabler-icons-react';

import { usePokemonModalStyles } from '../styles/components';
import {
  GetMovesRequestedAction,
  MovesActionTypes,
  ToggleUserPokemonRequestedAction,
  UserActionTypes,
} from '../actionTypes';
import {
  backgroundColorByType,
  capitalize,
  colorByType,
  formatId,
} from './utils';
import pokeballBackground from '../assets/pokeballBackground.png';
import { Move } from './Move';
import {
  getIsPokemonSelected,
  getMovesArrayByIds,
  getMovesLoading,
  getPokemonById,
} from '../selectors';
import { useTypedDispatch, useTypedSelector } from '../hooks';

type PokemonModalProps = {
  pokemonId: number;
};

export const PokemonModal = (props: ContextModalProps<PokemonModalProps>) => {
  const {
    id,
    context: { closeModal },
    innerProps: { pokemonId },
  } = props;

  const dispatch = useTypedDispatch();
  const { classes } = usePokemonModalStyles();

  const pokemon = useTypedSelector((state) => getPokemonById(state, pokemonId));
  const moves = useTypedSelector((state) => getMovesArrayByIds(state, pokemon.movesIds));
  const movesLoading = useTypedSelector(getMovesLoading);
  const isSelected = useTypedSelector((state) => getIsPokemonSelected(state, pokemon.id));

  const capitalizedName = capitalize(pokemon.name);
  const formattedId = formatId(pokemon.id);

  const handleIconClick = () => {
    dispatch<ToggleUserPokemonRequestedAction>({
      type: UserActionTypes.TOGGLE_USER_POKEMON_REQUESTED,
      payload: { pokemonId: pokemon.id },
    });
  };
  const handleCloseClick = () => closeModal(id);

  useEffect(() => {
    dispatch<GetMovesRequestedAction>({
      type: MovesActionTypes.GET_MOVES_REQUESTED,
      payload: { movesIds: pokemon.movesIds },
    });
  }, []);

  return (
    <Box className={classes.wrapper}>
      <CloseButton
        className={classes.closeButton}
        onClick={handleCloseClick}
        aria-label="Close modal"
        size="xl"
      />
      <Box className={classes.leftSideWrapper}>
        <Box className={classes.upperWrapper}>
          <Box
            className={classes.imageWrapper}
            sx={{
              backgroundColor: backgroundColorByType(pokemon.types[0].name),
            }}
          >
            <Image
              className={classes.imageBackground}
              src={pokeballBackground}
            />
            <Image
              className={classes.image}
              src={pokemon.image}
              alt={pokemon.name}
              width={380}
              height={380}
            />
          </Box>
          <Box className={classes.actionWrapper}>
            <ActionIcon
              onClick={handleIconClick}
              size={46}
              variant="transparent"
            >
              <Pokeball
                className={classes.actionIcon}
                size={46}
                color={isSelected ? '#fff' : '#A0A0A0'}
                fill={isSelected ? '#A0A0A0' : 'transparent'}
              />
            </ActionIcon>
          </Box>
        </Box>
        <Box className={classes.infoWrapper}>
          <Text className={classes.pokemonId}>
            {formattedId}
          </Text>
          <Title className={classes.pokemonName} order={2}>
            {capitalizedName}
          </Title>
          <Group spacing={4}>
            {pokemon.types.map((type) => (
              <Badge
                key={type.id}
                variant="filled"
                radius="sm"
                sx={{ backgroundColor: colorByType(type.name) }}
              >
                {type.name}
              </Badge>
            ))}
          </Group>
        </Box>
      </Box>
      <Box className={classes.rightSideWrapper}>
        <Title className={classes.movesHeader} order={3}>
          Ataques
        </Title>
        <ScrollArea scrollbarSize={6} type="scroll" offsetScrollbars>
          <Stack className={classes.movesGroup} spacing={4}>
            {moves.map((move, index) => (
              <>
                <Move key={move.id} move={move} />
                {index !== moves.length - 1 && <Divider />}
              </>
            ))}
          </Stack>
        </ScrollArea>
        {movesLoading && (
          <Center py="xs">
            <Pokeball
              className={classes.pokeballLoading}
              size={30}
              color="#A0A0A0"
            />
          </Center>
        )}
      </Box>
    </Box>
  );
};
