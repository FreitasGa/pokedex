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
import { useTypedDispatch, useTypedSelector } from '../hooks';
import { getCurrentUser, getUserLoading } from '../selectors';
import { LogoutRequestedAction, UserActionTypes } from '../actionTypes';

const defaultLinks = [
  { name: 'Inicio', pathname: '/' },
];

const notLoggedInLinks = [
  { name: 'Entrar', pathname: '/login' },
  { name: 'Cadastro', pathname: '/register' },
];

const loggedInLinks = [
  { name: 'Perfil', pathname: '/profile' },
];

export const Header = () => {
  const dispatch = useTypedDispatch();
  const location = useLocation();

  const { classes } = useHeaderStyles();

  const [activeLink, setActiveLink] = useState<string>(location.pathname);

  const currentUser = useTypedSelector(getCurrentUser);
  const isLoading = useTypedSelector(getUserLoading);

  const links = useMemo(() => {
    if (!currentUser) {
      return [...defaultLinks, ...notLoggedInLinks];
    }
    if (currentUser) {
      return [...defaultLinks, ...loggedInLinks];
    }

    return defaultLinks;
  }, [currentUser]);

  const handleLogOut = () => {
    dispatch<LogoutRequestedAction>({
      type: UserActionTypes.LOGOUT_REQUESTED,
    });
  };

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
          {currentUser && (
            <Button
              className={classes.link}
              onClick={handleLogOut}
              variant="subtle"
              loading={isLoading}
              color="red"
            >
              Sair
            </Button>
          )}
        </Group>
      </Container>
    </HeaderWrapper>
  );
};
