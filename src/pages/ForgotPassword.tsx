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
import { Link, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';

import { useForgotPasswordStyles } from '../styles/pages';
import { withHeader } from '../hocs';
import { useTypedDispatch, useTypedSelector } from '../hooks';
import {
  getForgotPasswordError,
  getForgotPasswordLoading,
  getForgotPasswordNeedsConfirmation,
} from '../selectors';
import {
  ConfirmForgotPasswordRequestedAction,
  ForgotPasswordRequestedAction,
  ResetConfirmation,
  UserActionTypes,
} from '../actionTypes';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
});

const confirmForgotPasswordSchema = Yup.object().shape({
  code: Yup.string()
    .min(6, 'Código deve ter no mínimo 6 caracteres')
    .required('Código é obrigatório'),
  password: Yup.string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .required('Senha é obrigatória'),
});

const ForgotPassword = () => {
  const dispatch = useTypedDispatch();

  const { classes } = useForgotPasswordStyles();

  const loading = useTypedSelector(getForgotPasswordLoading);
  const error = useTypedSelector(getForgotPasswordError);
  const needsConfirmation = useTypedSelector(getForgotPasswordNeedsConfirmation);

  const [searchParams] = useSearchParams();

  const forgotPasswordForm = useForm({
    schema: yupResolver(forgotPasswordSchema),
    initialValues: {
      email: searchParams.get('email') || '',
    },
  });

  const confirmForgotPasswordForm = useForm({
    schema: yupResolver(confirmForgotPasswordSchema),
    initialValues: {
      code: '',
      password: '',
    },
  });

  const handleSubmit = () => {
    const { email } = forgotPasswordForm.values;

    dispatch<ForgotPasswordRequestedAction>({
      type: UserActionTypes.FORGOT_PASSWORD_REQUESTED,
      payload: {
        email,
      },
    });
  };

  const handleEmailConfirmation = () => {
    const { email } = forgotPasswordForm.values;
    const { code, password } = confirmForgotPasswordForm.values;

    dispatch<ConfirmForgotPasswordRequestedAction>({
      type: UserActionTypes.CONFIRM_FORGOT_PASSWORD_REQUESTED,
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
        forgotPasswordForm.setErrors({
          email: 'E-mail inválido',
        });
      } else {
        confirmForgotPasswordForm.setErrors({
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
          {!needsConfirmation ? 'Esqueceu a senha' : 'Crie uma nova senha'}
        </Title>
        <form
          className={classes.form}
          onSubmit={
            !needsConfirmation
              ? forgotPasswordForm.onSubmit(handleSubmit)
              : confirmForgotPasswordForm.onSubmit(handleEmailConfirmation)
          }
        >
          {!needsConfirmation ? (
            <TextInput
              required
              label="Seu e-mail"
              placeholder="Digite seu e-mail"
              {...forgotPasswordForm.getInputProps('email')}
            />
          ) : (
            <>
              <TextInput
                required
                label="Código"
                placeholder="Digite o código de confirmação"
                {...confirmForgotPasswordForm.getInputProps('code')}
              />
              <PasswordInput
                required
                label="Nova senha"
                placeholder="Digite uma nova senha"
                {...confirmForgotPasswordForm.getInputProps('password')}
              />
            </>
          )}
          <Button fullWidth size="lg" type="submit" loading={loading}>
            {!needsConfirmation ? 'Enviar e-mail' : 'Criar nova senha'}
          </Button>
        </form>
        <Anchor component={Link} to="/login" align="center" size="sm">
          Entrar em uma conta
        </Anchor>
      </Box>
    </Container>
  );
};

export const ForgotPasswordPage = withHeader(ForgotPassword);
