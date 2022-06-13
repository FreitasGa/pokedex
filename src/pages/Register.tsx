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

import { useRegisterStyles } from '../styles/pages';
import { withHeader } from '../hocs';
import { useTypedDispatch, useTypedSelector } from '../hooks';
import { getUserLoading } from '../selectors';
import { RegisterRequestedAction, UserActionTypes } from '../actionTypes';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .required('Senha é obrigatória'),
});

const Register = () => {
  const dispatch = useTypedDispatch();

  const { classes } = useRegisterStyles();

  const isLoading = useTypedSelector(getUserLoading);

  const registerForm = useForm({
    schema: yupResolver(schema),
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = () => {
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

  return (
    <Container className={classes.wrapper}>
      <Box className={classes.box}>
        <Title className={classes.title} order={3}>
          Crie sua conta
        </Title>
        <form
          className={classes.form}
          onSubmit={registerForm.onSubmit(handleSubmit)}
        >
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
          <Button fullWidth size="lg" type="submit" loading={isLoading}>
            Criar
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
