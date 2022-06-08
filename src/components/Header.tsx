import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Burger,
  Container,
  Group,
  Header as HeaderWrapper,
  Paper,
  Title,
  Transition,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';

import { useHeaderStyles } from '../styles/components';

const links = [
  {
    name: 'Home',
    pathname: '/',
  },
];

export const Header = () => {
  const location = useLocation();
  const { classes, cx } = useHeaderStyles();

  const [open, toggleOpen] = useBooleanToggle(false);
  const [activeLink, setActiveLink] = useState<string>(location.pathname);

  const items = links.map((link) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: activeLink === link.pathname,
      })}
      key={link.name}
      to={link.pathname}
      onClick={() => {
        setActiveLink(link.pathname);
        toggleOpen(false);
      }}
    >
      {link.name}
    </Link>
  ));

  return (
    <HeaderWrapper className={classes.wrapper} height={60}>
      <Container className={classes.header}>
        <Title order={2}>Pokédex</Title>
        <Group className={classes.links} spacing={5}>
          {items}
        </Group>
        <Burger
          className={classes.burger}
          opened={open}
          onClick={() => toggleOpen()}
          size="sm"
        />
        <Transition transition="scale-y" duration={200} mounted={open}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </HeaderWrapper>
  );
};
