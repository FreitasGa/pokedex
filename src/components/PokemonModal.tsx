import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  ActionIcon,
  Badge,
  Box,
  Group,
  Image,
  Text,
  Title,
} from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { useBooleanToggle } from '@mantine/hooks';
import { Pokeball } from 'tabler-icons-react';

import { Pokemon } from '../types';
import { usePokemonModalStyles } from '../styles/components';
import { ActionTypes, GetPokemonMoveRequestedAction } from '../actionTypes';
import {
  backgroundColorByType,
  capitalize,
  colorByType,
  formatId,
} from './utils';
import pokeballBackground from '../assets/pokeballBackground.png';
import { Move } from './Move';

type PokemonModalProps = {
  pokemon: Pokemon;
  selected: boolean;
};

export const PokemonModal = (props: ContextModalProps<PokemonModalProps>) => {
  const {
    innerProps: { pokemon, selected },
  } = props;

  const dispatch = useDispatch();
  const { classes } = usePokemonModalStyles();

  const [isSelected, toggleIsSelected] = useBooleanToggle(selected);

  const capitalizedName = capitalize(pokemon.name);
  const formattedId = formatId(pokemon.id);

  const handleIconClick = () => {
    toggleIsSelected();
  };

  useEffect(() => {
    dispatch<GetPokemonMoveRequestedAction>({
      type: ActionTypes.GET_POKEMON_MOVE_REQUESTED,
      payload: { id: pokemon.id },
    });
  }, []);

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.sideWrapper}>
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
              width={420}
              height={420}
            />
          </Box>
          <Box className={classes.actionWrapper}>
            <ActionIcon
              onClick={handleIconClick}
              size={36}
              variant="transparent"
            >
              <Pokeball
                className={classes.actionIcon}
                size={36}
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
            {pokemon.types.map(({ id, name }) => (
              <Badge
                key={id}
                variant="filled"
                radius="sm"
                sx={{ backgroundColor: colorByType(name) }}
              >
                {name}
              </Badge>
            ))}
          </Group>
        </Box>
      </Box>
      <Box className={classes.sideWrapper}>
        <Title className={classes.pokemonName} order={2}>
          Ataques
        </Title>
        <Group spacing={4} direction="column">
          {pokemon.moves?.map((move) => (
            <Move key={move.id} move={move} />
          ))}
        </Group>
      </Box>
    </Box>
  );
};
