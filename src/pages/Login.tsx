/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Anchor,
  Box,
  Button,
  Container,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useLoginStyles } from '../styles/pages';
import { withHeader } from '../hocs';
import { useTypedDispatch, useTypedSelector } from '../hooks';
import { getUserLoading } from '../selectors';
import { LoginRequestedAction, UserActionTypes } from '../actionTypes';

const schema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .required('Senha é obrigatória'),
});

const Login = () => {
  const dispatch = useTypedDispatch();

  const { classes } = useLoginStyles();

  const isLoading = useTypedSelector(getUserLoading);

  const loginForm = useForm({
    schema: yupResolver(schema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = () => {
    const { email, password } = loginForm.values;

    dispatch<LoginRequestedAction>({
      type: UserActionTypes.LOGIN_REQUESTED,
      payload: {
        email,
        password,
      },
    });
  };

  return (
    <Container className={classes.wrapper}>
      <Box className={classes.box}>
        <Title className={classes.title} order={3}>
          Entre com sua conta
        </Title>
        <form
          className={classes.form}
          onSubmit={loginForm.onSubmit(handleSubmit)}
        >
          <TextInput
            required
            label="Seu e-mail"
            placeholder="Digite seu e-mail"
            {...loginForm.getInputProps('email')}
          />
          <PasswordInput
            required
            label="Sua senha"
            placeholder="Digite sua senha"
            {...loginForm.getInputProps('password')}
          />
          <Anchor
            component={Link}
            to="/forgot-password"
            align="right"
            size="sm"
          >
            Esqueceu sua senha?
          </Anchor>
          <Button fullWidth size="lg" type="submit" loading={isLoading}>
            Entrar
          </Button>
        </form>
        <Anchor component={Link} to="/register" align="center" size="sm">
          Criar uma conta
        </Anchor>
      </Box>
    </Container>
  );
};

export const LoginPage = withHeader(Login);
