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
import { useBooleanToggle } from '@mantine/hooks';
import { useModals } from '@mantine/modals';
import { Pokeball } from 'tabler-icons-react';

import { Pokemon } from '../types';
import {
  backgroundColorByType,
  capitalize,
  colorByType,
  formatId,
} from './utils';
import { usePokemonCardStyles } from '../styles/components';
import pokeballBackground from '../assets/pokeballBackground.png';

interface PokemonPreviewProps {
  pokemon: Pokemon;
  selected: boolean;
}

export const PokemonCard = (props: PokemonPreviewProps) => {
  const { pokemon, selected } = props;

  const modals = useModals();
  const { classes } = usePokemonCardStyles();

  const [isSelected, toggleIsSelected] = useBooleanToggle(selected);

  const capitalizedName = capitalize(pokemon.name);
  const formattedId = formatId(pokemon.id);

  const handleCardClick = () => {
    modals.openContextModal('PokemonModal', {
      centered: true,
      padding: 0,
      withCloseButton: false,
      size: 'fit-content',
      radius: 'md',
      styles: {
        inner: {
          padding: 0,
        },
        modal: {
          marginLeft: 0,
        },
      },
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
    toggleIsSelected();
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
          <Image
            className={classes.imageBackground}
            src={pokeballBackground}
          />
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
      <Box className={classes.infoWrapper} p="md">
        <Text className={classes.pokemonId}>
          {formattedId}
        </Text>
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
