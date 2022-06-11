import React from 'react';
import {
  ActionIcon,
  Badge,
  Box,
  Group,
  Image,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import { useModals } from '@mantine/modals';
import { Pokeball } from 'tabler-icons-react';

import { Pokemon } from '../types';
import {
  backgroundColorByType,
  capitalize,
  colorByType,
} from './utils';
import { usePokemonCardStyles } from '../styles/components';
import pokeballBackground from '../assets/pokeballBackground.png';
import { useTypedDispatch, useTypedSelector } from '../hooks';
import { getIsPokemonSelected } from '../selectors';
import {
  ToggleUserPokemonRequestedAction,
  UserActionTypes,
} from '../actionTypes';

interface PokemonPreviewProps {
  pokemon: Pokemon;
}

export const PokemonCard = (props: PokemonPreviewProps) => {
  const { pokemon } = props;

  const dispatch = useTypedDispatch();
  const modals = useModals();
  const { classes } = usePokemonCardStyles();

  const isSelected = useTypedSelector((state) => getIsPokemonSelected(state, pokemon.id));

  const capitalizedName = capitalize(pokemon.name);

  const handleCardClick = () => {
    modals.openContextModal('PokemonModal', {
      centered: true,
      padding: 0,
      withCloseButton: false,
      size: 'fit-content',
      radius: 'md',
      styles: (theme) => ({
        inner: {
          padding: 0,
        },
        modal: {
          marginLeft: 0,

          [theme.fn.smallerThan('sm')]: {
            borderRadius: 0,
          },
        },
      }),
      innerProps: {
        pokemonId: pokemon.id,
        selected: isSelected,
      },
    });
  };

  const handleSelectClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    dispatch<ToggleUserPokemonRequestedAction>({
      type: UserActionTypes.TOGGLE_USER_POKEMON_REQUESTED,
      payload: { pokemonId: pokemon.id },
    });
  };

  return (
    <Paper
      className={classes.wrapper}
      onClick={handleCardClick}
      radius="md"
      shadow="md"
      withBorder
    >
      <Box className={classes.upperWrapper}>
        <Box
          className={classes.imageWrapper}
          sx={{ backgroundColor: backgroundColorByType(pokemon.types[0].name) }}
        >
          <Image className={classes.imageBackground} src={pokeballBackground} />
          <Image
            className={classes.image}
            src={pokemon.image}
            alt={pokemon.name}
            width={200}
            height={200}
          />
        </Box>
        <Box className={classes.actionWrapper}>
          <ActionIcon
            onClick={handleSelectClick}
            size={38}
            variant="transparent"
          >
            <Pokeball
              className={classes.actionIcon}
              size={38}
              color={isSelected ? '#fff' : '#A0A0A0'}
              fill={isSelected ? '#A0A0A0' : 'transparent'}
            />
          </ActionIcon>
        </Box>
      </Box>
      <Box className={classes.infoWrapper} p="md">
        <Text className={classes.pokemonId}>{`#${pokemon.formattedId}`}</Text>
        <Title className={classes.pokemonName} order={3}>
          {capitalizedName}
        </Title>
        <Group spacing={4}>
          {pokemon.types.map(({ name, id }) => (
            <Badge
              key={id}
              sx={{ backgroundColor: colorByType(name) }}
              variant="filled"
              radius="sm"
            >
              {name}
            </Badge>
          ))}
        </Group>
      </Box>
    </Paper>
  );
};
