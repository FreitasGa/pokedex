import { createStyles, keyframes } from '@mantine/core';

const pokeball = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

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
    animation: `${pokeball} 2s cubic-bezier(0.55, 0.06, 0.68, 0.19) infinite`,
  },
  pokeballLoading: {
    animation: `${pokeballLoader} 1s linear infinite`,
  },
}));
