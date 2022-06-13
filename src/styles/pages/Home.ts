import { createStyles, keyframes } from '@mantine/core';

const pokeballLoader = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

export const useHomeStyles = createStyles(() => ({
  pokeball: {
    color: 'transparent',
    fill: 'transparent',
    stroke: 'transparent',
  },
  pokeballLoading: {
    animation: `${pokeballLoader} 1s linear infinite`,
  },
}));
