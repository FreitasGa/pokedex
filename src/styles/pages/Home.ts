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
    stroke: 'transparent',
  },
  pokeballLoading: {
    animation: `${pokeballLoader} 1s linear infinite`,
    stroke: '#A0A0A0',
  },
}));
