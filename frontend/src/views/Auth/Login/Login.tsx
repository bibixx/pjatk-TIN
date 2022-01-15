import {
  LoginRequestDTO,
  LoginResponseDTO,
  loginValidatorFields,
} from '@s19192/shared';
import { Button } from 'components/Button/Button';
import { Input } from 'components/Input/Input';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { makeRequest } from 'utils/makeRequest';
import { validateField } from 'utils/validateField';
import { APIError } from 'utils/APIError';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth/useAuth';
import { LinkButton } from 'components/LinkButton/LinkButton';

export const Login = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values: LoginRequestDTO) => {
    try {
      const { user } = await makeRequest<LoginRequestDTO, LoginResponseDTO>(
        '/api/auth/login',
        'POST',
        values,
      );

      login(user);
      navigate('/');
    } catch (error) {
      if (error instanceof APIError) {
        return t('auth.login.error');
      }
    }

    return undefined;
  };

  return (
    <PageContainer>
      <header className="content-card__header-container">
        <h1 className="content-card__heading">{t('auth.login.header')}</h1>
      </header>
      <Form onSubmit={onSubmit}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Input
              name="username"
              label={t('auth.login.form.username')}
              required
              validate={validateField(loginValidatorFields.username)}
              autoComplete="username"
            />
            <Input
              name="password"
              label={t('auth.login.form.password')}
              required
              type="password"
              validate={validateField(loginValidatorFields.password)}
              autoComplete="current-password"
            />
            {props.submitFailed &&
              (props.hasValidationErrors || props.hasSubmitErrors) && (
                <div className="form__global-error-message">
                  {props.submitErrors ?? t('shared.formError')}
                </div>
              )}
            <div className="form__buttons-container">
              <Button type="submit">{t('auth.login.button')}</Button>
              <LinkButton to="/register" muted>
                {t('auth.login.registerButton')}
              </LinkButton>
            </div>
          </form>
        )}
      </Form>
    </PageContainer>
  );
};
