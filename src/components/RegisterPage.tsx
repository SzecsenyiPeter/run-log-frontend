import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Container, Form,
} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { RegisterUser, UserTypes } from '../domain/RegisterUser';
import { registerUser } from '../Api';

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();

  const naviage = useNavigate();

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

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedUserType, setSelectedUserType] = useState<UserTypes>(
    UserTypes.ATHLETE,
  );

  const [isSending, setIsSending] = useState<boolean>(false);

  const registerUserFromForm = async () => {
    setIsSending(true);
    const newUser: RegisterUser = {
      username,
      password,
      userType: selectedUserType,
    };
    await registerUser(newUser);
    naviage('/list');
    setIsSending(false);
  };

  return (
    <div>
      <Container>
        <Form>
          <Form.Field>
            <label>{t('register.username')}</label>
            <input value={username} data-testid="register-username" onChange={(event) => setUsername(event.currentTarget.value)} />
          </Form.Field>
          <Form.Field>
            <label>{t('register.password')}</label>
            <input type="password" value={password} data-testid="register-password" onChange={(event) => setPassword(event.currentTarget.value)} />
          </Form.Field>
          <Form.Dropdown
            label={t('register.userTypeLabel')}
            selection
            data-testid="register-type"
            search
            value={selectedUserType}
            onChange={(event, data) => setSelectedUserType(data.value as UserTypes)}
            options={UserTypeOptions}
          />
          <Button type="submit" color="violet" data-testid="register-submit" disabled={!username || !password || isSending} onClick={registerUserFromForm}>{t('register.submit')}</Button>
        </Form>
      </Container>
    </div>
  );
};
export default RegisterPage;
