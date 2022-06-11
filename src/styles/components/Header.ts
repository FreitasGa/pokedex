import { createStyles } from '@mantine/core';

export const useHeaderStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    zIndex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '60px',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
      height: 'fit-content',
      gap: '0.5rem',
      padding: '1rem',
    },
  },
  linkGroup: {
    [theme.fn.smallerThan('xs')]: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  link: {
    fontWeight: 600,

    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
}));
