import { createStyles } from '@mantine/core';

export const useMoveStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '0.5rem 0',
    width: 'fit-content',
  },
  bar: {
    height: '14px',
    width: '100%',
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
  },
  infoWrapper: {
    padding: '0 0.5rem',
    margin: '0.5rem 0',
  },
  moveName: {
    fontSize: '18px',
    fontWeight: 500,
    marginBottom: '0.25rem',
  },
}));
