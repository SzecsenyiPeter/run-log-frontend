import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Container, Form,
} from 'semantic-ui-react';

export enum UserTypes {
    ATHLETE,
    COACH
}

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();

  const UserTypeOptions = [
    {
      key: UserTypes.ATHLETE,
      text: t('register.athlete'),
      value: UserTypes.ATHLETE,
    },
    {
      key: UserTypes.COACH,
      text: t('register.coach'),
      value: UserTypes.COACH,
    },
  ];
  return (
    <div>
      <Container>
        <Form>
          <Form.Field>
            <label>{t('register.username')}</label>
            <input />
          </Form.Field>
          <Form.Field>
            <label>{t('register.password')}</label>
            <input type="password" />
          </Form.Field>
          <Form.Dropdown
            label={t('register.userTypeLabel')}
            selection
            options={UserTypeOptions}
          />
          <Button type="submit">{t('submit')}</Button>
        </Form>
      </Container>
    </div>
  );
};
export default RegisterPage;
