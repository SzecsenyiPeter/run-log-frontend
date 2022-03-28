import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Container, Form,
} from 'semantic-ui-react';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
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
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </div>
  );
};
export default RegisterPage;
