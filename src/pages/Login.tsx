/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
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
import {
  getLoginError,
  getLoginLoading,
  getLoginNeedsConfirmation,
} from '../selectors';
import {
  ConfirmRegisterRequestedAction,
  LoginRequestedAction,
  ResetConfirmation,
  UserActionTypes,
} from '../actionTypes';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .required('Senha é obrigatória'),
});

const emailConfirmationSchema = Yup.object().shape({
  code: Yup.string()
    .min(6, 'Código deve ter no mínimo 6 caracteres')
    .required('Código é obrigatório'),
});

const Login = () => {
  const dispatch = useTypedDispatch();

  const { classes } = useLoginStyles();

  const loading = useTypedSelector(getLoginLoading);
  const error = useTypedSelector(getLoginError);
  const needsConfirmation = useTypedSelector(getLoginNeedsConfirmation);

  const loginForm = useForm({
    schema: yupResolver(loginSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const emailConfirmationForm = useForm({
    schema: yupResolver(emailConfirmationSchema),
    initialValues: {
      code: '',
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

  const handleEmailConfirmation = () => {
    const { email, password } = loginForm.values;
    const { code } = emailConfirmationForm.values;

    dispatch<ConfirmRegisterRequestedAction>({
      type: UserActionTypes.CONFIRM_REGISTER_REQUESTED,
      payload: {
        email,
        password,
        code,
      },
    });
  };

  useEffect(() => {
    if (error) {
      if (!needsConfirmation) {
        loginForm.setErrors({
          email: 'E-mail ou senha inválidos',
          password: 'E-mail ou senha inválidos',
        });
      } else {
        emailConfirmationForm.setErrors({
          code: 'Código inválido',
        });
      }
    }

    return () => {
      dispatch<ResetConfirmation>({
        type: UserActionTypes.RESET_CONFIRMATION,
      });
    };
  }, [error]);

  return (
    <Container className={classes.wrapper}>
      <Box className={classes.box}>
        <Title className={classes.title} order={3}>
          {!needsConfirmation ? 'Entre com sua conta' : 'Confirme seu e-mail'}
        </Title>
        <form
          className={classes.form}
          onSubmit={
            !needsConfirmation
              ? loginForm.onSubmit(handleSubmit)
              : emailConfirmationForm.onSubmit(handleEmailConfirmation)
          }
        >
          {!needsConfirmation ? (
            <>
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
                to={{
                  pathname: '/forgot-password',
                  search: `?email=${encodeURIComponent(
                    loginForm.values.email,
                  )}`,
                }}
                align="right"
                size="sm"
              >
                Esqueceu sua senha?
              </Anchor>
            </>
          ) : (
            <TextInput
              required
              label="Código"
              placeholder="Digite o código de confirmação"
              {...emailConfirmationForm.getInputProps('code')}
            />
          )}
          <Button fullWidth size="lg" type="submit" loading={loading}>
            {!needsConfirmation ? 'Entrar na conta' : 'Confirmar e-mail'}
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
