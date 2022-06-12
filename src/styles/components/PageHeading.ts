import { createStyles } from '@mantine/core';

export const usePageHeadingStyles = createStyles((theme) => ({
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '1rem 1rem',
    marginTop: '1rem',

    [theme.fn.smallerThan('xs')]: {
      marginTop: 0,
      flexDirection: 'column',
      gap: '1rem',
      alignItems: 'flex-start',
    },
  },
  title: {
    fontWeight: 600,
  },
  searchBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: '0.5rem',

    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
  searchInput: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
    },
  },
  searchButton: {
    height: '36px',
    width: '36px',

    [theme.fn.smallerThan('xs')]: {
      minHeight: '42px',
      minWidth: '42px',
    },
  },
}));
