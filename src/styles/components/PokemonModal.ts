import { createStyles } from '@mantine/core';

export const usePokemonModalStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    maxHeight: '572px',
    gap: '0.5rem',
  },
  sideWrapper: {
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
    bottom: '-22px',
    right: 'calc(50% - 22px)',
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
  pokemonName: {
    fontWeight: 500,
  },
  movesGroup: {
    flexDirection: 'column',
    overflowY: 'auto',
  },
}));
