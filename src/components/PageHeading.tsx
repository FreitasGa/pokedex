import React from 'react';
import {
  Container,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Pokeball } from 'tabler-icons-react';
import { usePageHeadingStyles } from '../styles/components';

interface PageHeadingProps {
  title: string;
  searchValue: string;
  setSearchValue: (value: string | React.ChangeEvent<any> | null | undefined) => void;
}

export const PageHeading = (props: PageHeadingProps) => {
  const {
    title,
    searchValue,
    setSearchValue,
  } = props;

  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

  const { classes } = usePageHeadingStyles();

  return (
    <Container className={classes.heading} size="xl">
      <Title className={classes.title}>{title}</Title>
      <TextInput
        className={classes.searchInput}
        value={searchValue}
        onChange={setSearchValue}
        icon={<Pokeball />}
        size={matches ? 'md' : 'sm'}
        radius="md"
        type="search"
        label="Busque por nome ou número"
        placeholder="Ex: Pikachu ou 025"
        styles={(t) => ({
          label: {
            textAlign: 'center',
            width: '100%',

            [t.fn.smallerThan('sm')]: {
              fontSize: '18px',
              textAlign: 'left',
            },
          },
        })}
      />
    </Container>
  );
};
