import {
  RegisterRequestDTO,
  RegisterResponseDTO,
  registerValidator,
  registerValidatorFields,
} from '@s19192/shared';
import { Button } from 'components/Button/Button';
import { Input } from 'components/Input/Input';
import { PageContainer } from 'components/PageContainer/PageContainer';
import { Form } from 'react-final-form';
import { useTranslation } from 'react-i18next';
import { makeRequest } from 'utils/makeRequest';
import { validateField } from 'utils/validateField';
import { Infer } from 'typed';
import { APIError } from 'utils/APIError';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth/useAuth';
import { ParticipantsFormInputs } from 'views/Participants/ParticipantsFormInputs/ParticipantsFormInputs';

export const Register = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values: Infer<typeof registerValidator>) => {
    try {
      const { user } = await makeRequest<
        RegisterRequestDTO,
        RegisterResponseDTO
      >('/api/auth/register', 'POST', values);

      login(user);
      navigate('/');
    } catch (error) {
      if (error instanceof APIError) {
        return error.message;
      }
    }

    return undefined;
  };

  return (
    <PageContainer>
      <header className="content-card__header-container">
        <h1 className="content-card__heading">{t('auth.register.header')}</h1>
      </header>
      <Form onSubmit={onSubmit}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Input
              name="username"
              label={t('auth.register.form.username')}
              required
              validate={validateField(registerValidatorFields.username)}
            />
            <Input
              name="password"
              label={t('auth.register.form.password')}
              required
              type="password"
              validate={validateField(registerValidatorFields.password)}
            />
            <ParticipantsFormInputs />
            {props.submitFailed &&
              (props.hasValidationErrors || props.hasSubmitErrors) && (
                <div className="form__global-error-message">
                  {props.submitErrors ?? t('shared.formError')}
                </div>
              )}
            <div className="form__buttons-container">
              <Button type="submit">{t('auth.register.button')}</Button>
            </div>
          </form>
        )}
      </Form>
    </PageContainer>
  );
};
