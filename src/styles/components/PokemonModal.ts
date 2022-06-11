import { createStyles, keyframes } from '@mantine/core';

const pokeballLoader = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

export const usePokemonModalStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    maxHeight: '33.5rem',
    maxWidth: '60rem',
    transition: 'all 0.25s',
    position: 'relative',

    [theme.fn.smallerThan('lg')]: {
      maxWidth: '54rem',
    },

    [theme.fn.smallerThan('md')]: {
      maxWidth: '48rem',
    },

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      maxHeight: '100vh',
      overflow: 'auto',
    },
  },
  closeButton: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    zIndex: 5,
  },
  leftSideWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  upperWrapper: {
    position: 'relative',
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,

    [theme.fn.smallerThan('sm')]: {
      borderTopLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
  imageBackground: {
    position: 'absolute',
    opacity: 0.7,
    aspectRatio: '1/1',
    width: '60%',
    top: '8%',
    right: '-30%',
    pointerEvents: 'none',
  },
  image: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: '1rem 0.5rem',
    zIndex: 1,
  },
  actionWrapper: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: 'fit-content',
    height: 'fit-content',
    padding: '0.25rem 0.25rem',
    borderRadius: '100%',
    bottom: '-29px',
    right: 'calc(12.5% - 29px)',
    zIndex: 2,
  },
  actionIcon: {
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      transform: 'rotate(-15deg)',
    },
  },
  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
    padding: theme.spacing.md,
  },
  pokemonId: {
    color: '#A0A0A0',
    fontWeight: 600,
  },
  rightSideWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.md,
    minWidth: '20rem',

    [theme.fn.smallerThan('sm')]: {
      minWidth: 0,
    },
  },
  pokemonName: {
    fontWeight: 500,
    marginBottom: '0.25rem',
  },
  movesGroup: {
    flexDirection: 'column',
    overflowY: 'auto',
  },
  movesHeader: {
    fontWeight: 500,
    marginBottom: '0.25rem',
  },
  pokeballLoading: {
    animation: `${pokeballLoader} 1s linear infinite`,
  },
}));
