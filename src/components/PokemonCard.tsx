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

  const [isPokemonSelected, toggleIsPokemonSelected] = useBooleanToggle(selected);

  const capitalizedName = capitalize(pokemon.name);
  const sortedTypes = [...pokemon.types].sort((a, b) => a.slot - b.slot);
  const formattedId = formatId(pokemon.id);

  const handleCardClick = () => {
    modals.openContextModal('PokemonModal', {
      centered: true,
      withCloseButton: false,
      radius: 'md',
      padding: 0,
      innerProps: {
        pokemon,
      },
    });
  };

  const handleIconClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    toggleIsPokemonSelected();
  };

  return (
    <Paper
      className={classes.wrapper}
      radius="md"
      shadow="md"
      withBorder
      onClick={handleCardClick}
    >
      <Box className={classes.upperWrapper}>
        <Box
          className={classes.imageWrapper}
          sx={{ backgroundColor: backgroundColorByType(sortedTypes[0].name) }}
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
          <ActionIcon variant="transparent" size={36} onClick={handleIconClick}>
            <Pokeball
              className={classes.actionIcon}
              size={36}
              color={isPokemonSelected ? '#fff' : '#A0A0A0'}
              fill={isPokemonSelected ? '#A0A0A0' : 'transparent'}
            />
          </ActionIcon>
        </Box>
      </Box>
      <Box className={classes.infoWrapper} p="md">
        <Text className={classes.pokemonId}>{formattedId}</Text>
        <Title className={classes.pokemonName} order={3}>
          {capitalizedName}
        </Title>
        <Group spacing={4}>
          {sortedTypes.map((type) => (
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
    </Paper>
  );
};
