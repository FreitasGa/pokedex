import React from 'react';
import { Badge, Box, Text } from '@mantine/core';

import { PokemonMove } from '../types';
import { capitalize, colorByType } from './utils';

interface MoveProps {
  move: PokemonMove;
}

export const Move = (props: MoveProps) => {
  const { move } = props;

  const capitalizedMoveName = capitalize(move.name);

  return (
    <Box>
      <Text>
        {capitalizedMoveName}
      </Text>
      <Badge
        variant="filled"
        radius="sm"
        sx={{ backgroundColor: colorByType(move.type) }}
      >
        {move.type}
      </Badge>
      <Text>
        {move.description}
      </Text>
    </Box>
  );
};
