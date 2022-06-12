import React, { useEffect } from 'react';
import {
  ActionIcon,
  Box,
  Container,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useInputState, useMediaQuery } from '@mantine/hooks';
import { Pokeball, Search } from 'tabler-icons-react';
import { usePageHeadingStyles } from '../styles/components';

interface PageHeadingProps {
  title: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const PageHeading = (props: PageHeadingProps) => {
  const { title, setValue } = props;

  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);

  const { classes } = usePageHeadingStyles();

  const [searchValue, setSearchValue] = useInputState('');

  const handleSearch = () => {
    setValue(searchValue);
  };

  useEffect(() => {
    if (searchValue === '') {
      setValue('');
    }
  }, [searchValue]);

  return (
    <Container className={classes.heading} size="xl">
      <Title className={classes.title}>{title}</Title>
      <Box className={classes.searchBox}>
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

              [t.fn.smallerThan('xs')]: {
                fontSize: '18px',
                textAlign: 'left',
              },
            },
          })}
        />
        <ActionIcon
          className={classes.searchButton}
          onClick={handleSearch}
          color="dark"
          radius="md"
          variant="filled"
        >
          <Search />
        </ActionIcon>
      </Box>
    </Container>
  );
};
