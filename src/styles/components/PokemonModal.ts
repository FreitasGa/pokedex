import { createStyles } from '@mantine/core';

export const usePokemonModalStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  upperWrapper: {
    position: 'relative',
  },
  imageWrapper: {
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
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
}));
