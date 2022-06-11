import { createStyles } from '@mantine/core';

export const useHomeStyles = createStyles(() => ({
  wrapper: {
    position: 'relative',
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: '1rem 1rem',
  },
}));
