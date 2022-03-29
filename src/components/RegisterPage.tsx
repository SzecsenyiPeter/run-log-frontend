import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Container, Form,
} from 'semantic-ui-react';
import { RegisterUser, UserTypes } from '../domain/RegisterUser';
import { registerUser } from '../Api';

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
    setIsSending(false);
  };

  return (
    <div>
      <Container>
        <Form>
          <Form.Field>
            <label>{t('register.username')}</label>
            <input value={username} onChange={(event) => setUsername(event.currentTarget.value)} />
          </Form.Field>
          <Form.Field>
            <label>{t('register.password')}</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
          </Form.Field>
          <Form.Dropdown
            label={t('register.userTypeLabel')}
            selection
            value={selectedUserType}
            onChange={(event, data) => setSelectedUserType(data.value as UserTypes)}
            options={UserTypeOptions}
          />
          <Button type="submit" color="violet" disabled={!username || !password || isSending} onClick={registerUserFromForm}>{t('register.submit')}</Button>
        </Form>
      </Container>
    </div>
  );
};
export default RegisterPage;
