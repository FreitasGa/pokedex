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

    [theme.fn.smallerThan('sm')]: {
      marginTop: 0,
      flexDirection: 'column',
      gap: '1rem',
      alignItems: 'flex-start',
    },
  },
  title: {
    fontWeight: 600,
  },
  searchInput: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },
}));
