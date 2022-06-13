import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Anchor,
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

const notLoggedInLinks = [
  { name: 'Entrar', pathname: '/login' },
  { name: 'Cadastro', pathname: '/register' },
];

const loggedInLinks = [
  { name: 'Coleção', pathname: '/collection' },
];

export const Header = () => {
  const dispatch = useTypedDispatch();
  const location = useLocation();

  const { classes } = useHeaderStyles();

  const currentUser = useTypedSelector(getCurrentUser);
  const isLoading = useTypedSelector(getUserLoading);

  const links = useMemo(() => {
    let toReturn;

    if (currentUser) {
      toReturn = [...loggedInLinks];
    } else {
      toReturn = [...notLoggedInLinks];
    }

    if (location.pathname !== '/') {
      const activeLink = toReturn.findIndex((link) => link.pathname === location.pathname);
      toReturn.splice(activeLink, 1);
      toReturn = [{ name: 'Home', pathname: '/' }, ...toReturn];
    }

    return toReturn;
  }, [currentUser, location.pathname]);

  const handleLogOut = () => {
    dispatch<LogoutRequestedAction>({
      type: UserActionTypes.LOGOUT_REQUESTED,
    });
  };

  return (
    <HeaderWrapper className={classes.wrapper} height="fit-content">
      <Container className={classes.header} size="xl">
        <Anchor component={Link} to="/" underline={false}>
          <Title order={2}>Pokédex</Title>
        </Anchor>
        <Group spacing={5}>
          {links.map((link) => (
            <Button
              className={classes.link}
              key={link.name}
              component={Link}
              to={link.pathname}
              variant="subtle"
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
