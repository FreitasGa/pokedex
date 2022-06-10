import React from 'react';
import { Box, Paper, Text } from '@mantine/core';

import { PokemonMove } from '../types';
import { backgroundColorByType, capitalize } from './utils';
import { useMoveStyles } from '../styles/components';

interface MoveProps {
  move: PokemonMove;
}

export const Move = (props: MoveProps) => {
  const { move } = props;

  const { classes } = useMoveStyles();

  const capitalizedMoveName = capitalize(move.name);

  return (
    <Paper
      className={classes.wrapper}
      p={0}
      radius="md"
      withBorder
    >
      <Box
        className={classes.bar}
        sx={{ backgroundColor: backgroundColorByType(move.type) }}
      />
      <Box className={classes.infoWrapper}>
        <Text className={classes.moveName}>
          {capitalizedMoveName}
        </Text>
        <Text>
          {move.description}
        </Text>
      </Box>
    </Paper>
  );
};
