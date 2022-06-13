import { createStyles } from '@mantine/core';

export const useRegisterStyles = createStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 61px)',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '340px',
  },
  title: {
    fontWeight: 500,
    marginBottom: '0.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
}));
