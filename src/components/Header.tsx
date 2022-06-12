import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Button,
  Container,
  Group,
  Header as HeaderWrapper,
  Title,
} from '@mantine/core';

import { useHeaderStyles } from '../styles/components';

export const Header = () => {
  const location = useLocation();

  const { classes } = useHeaderStyles();

  const [activeLink, setActiveLink] = useState<string>(location.pathname);

  const links = useMemo(() => [
    {
      name: 'Inicio',
      pathname: '/',
    },
    {
      name: 'Coleção',
      pathname: '/collection',
    },
  ], []);

  return (
    <HeaderWrapper className={classes.wrapper} height="fit-content">
      <Container className={classes.header} size="xl">
        <Title order={2}>Pokédex</Title>
        <Group spacing={5}>
          {links.map((link) => (
            <Button
              className={classes.link}
              key={link.name}
              component={Link}
              to={link.pathname}
              onClick={() => setActiveLink(link.pathname)}
              variant={activeLink === link.pathname ? 'filled' : 'subtle'}
            >
              {link.name}
            </Button>
          ))}
        </Group>
      </Container>
    </HeaderWrapper>
  );
};
