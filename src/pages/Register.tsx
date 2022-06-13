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

import { useRegisterStyles } from '../styles/pages';
import { withHeader } from '../hocs';
import { useTypedDispatch, useTypedSelector } from '../hooks';
import {
  getRegisterError,
  getRegisterLoading,
  getRegisterNeedsConfirmation,
} from '../selectors';
import {
  ConfirmRegisterRequestedAction,
  RegisterRequestedAction,
  ResetConfirmation,
  UserActionTypes,
} from '../actionTypes';

const registerSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
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

const Register = () => {
  const dispatch = useTypedDispatch();

  const { classes } = useRegisterStyles();

  const loading = useTypedSelector(getRegisterLoading);
  const error = useTypedSelector(getRegisterError);
  const needsConfirmation = useTypedSelector(getRegisterNeedsConfirmation);

  const registerForm = useForm({
    schema: yupResolver(registerSchema),
    initialValues: {
      name: '',
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

  const handleRegister = () => {
    const { name, email, password } = registerForm.values;

    dispatch<RegisterRequestedAction>({
      type: UserActionTypes.REGISTER_REQUESTED,
      payload: {
        name,
        email,
        password,
      },
    });
  };

  const handleEmailConfirmation = () => {
    const { email, password } = registerForm.values;
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
      if (needsConfirmation) {
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
          {!needsConfirmation ? 'Crie sua conta' : 'Confirme seu e-mail'}
        </Title>
        <form
          className={classes.form}
          onSubmit={
            !needsConfirmation
              ? registerForm.onSubmit(handleRegister)
              : emailConfirmationForm.onSubmit(handleEmailConfirmation)
          }
        >
          {!needsConfirmation ? (
            <>
              <TextInput
                required
                label="Nome"
                placeholder="Digite seu nome"
                {...registerForm.getInputProps('name')}
              />
              <TextInput
                required
                label="E-mail"
                placeholder="Digite seu e-mail"
                {...registerForm.getInputProps('email')}
              />
              <PasswordInput
                required
                label="Senha"
                placeholder="Digite uma senha"
                {...registerForm.getInputProps('password')}
              />
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
            {!needsConfirmation ? 'Criar conta' : 'Confirmar e-mail'}
          </Button>
        </form>
        <Anchor component={Link} to="/login" align="center" size="sm">
          Entrar em uma conta
        </Anchor>
      </Box>
    </Container>
  );
};

export const RegisterPage = withHeader(Register);
