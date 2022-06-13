import { createStyles } from '@mantine/core';

export const useHeaderStyles = createStyles((theme) => ({
  wrapper: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '0.5rem',
      height: '100px',
    },
  },
  link: {
    fontWeight: 600,
  },
}));
