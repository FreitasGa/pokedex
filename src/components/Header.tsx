import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Button,
  Container,
  Group,
  Header as HeaderWrapper,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Home, User } from 'tabler-icons-react';

import { useHeaderStyles } from '../styles/components';

const links = [
  {
    name: 'Inicio',
    pathname: '/',
    icon: <Home size={18} />,
  },
  {
    name: 'Coleção',
    pathname: '/collection',
    icon: <User size={18} />,
  },
];

export const Header = () => {
  const location = useLocation();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
  const { classes } = useHeaderStyles();

  const [activeLink, setActiveLink] = useState<string>(location.pathname);

  const items = links.map((link) => (
    <Button
      className={classes.link}
      key={link.name}
      component={Link}
      to={link.pathname}
      onClick={() => setActiveLink(link.pathname)}
      leftIcon={matches ? undefined : link.icon}
      variant={activeLink === link.pathname ? 'filled' : 'subtle'}
    >
      {link.name}
    </Button>
  ));

  return (
    <HeaderWrapper className={classes.wrapper} height="fit-content">
      <Container className={classes.header} size="xl">
        <Title order={2}>Pokédex</Title>
        <Group spacing={5}>
          {items}
        </Group>
      </Container>
    </HeaderWrapper>
  );
};
