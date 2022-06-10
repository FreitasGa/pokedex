import React from 'react';
import { Box, Text } from '@mantine/core';

import { PokemonMove } from '../types';
import { capitalize } from './utils';
import { useMoveStyles } from '../styles/components';

interface MoveProps {
  move: PokemonMove;
}

export const Move = (props: MoveProps) => {
  const { move } = props;

  const { classes } = useMoveStyles();

  const capitalizedMoveName = capitalize(move.name);

  return (
    <Box className={classes.wrapper}>
      <Text weight={500}>{capitalizedMoveName}</Text>
      <Text size="sm">{move.description}</Text>
    </Box>
  );
};
