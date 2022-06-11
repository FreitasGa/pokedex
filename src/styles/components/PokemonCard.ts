import { createStyles } from '@mantine/core';

export const usePokemonCardStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  upperWrapper: {
    position: 'relative',
  },
  imageWrapper: {
    position: 'relative',
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
    overflow: 'hidden',
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
    bottom: '-23px',
    right: 'calc(50% - 23px)',
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
  },
  pokemonId: {
    color: '#A0A0A0',
    fontWeight: 600,
  },
  pokemonName: {
    fontWeight: 500,
  },
}));
