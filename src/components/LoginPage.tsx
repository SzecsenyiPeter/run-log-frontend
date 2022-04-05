import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Container, Form,
} from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../Api';
import { LoginUser } from '../domain/LoginUser';
import { RunLogContext, RunLogContextInterface } from '../App';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isSending, setIsSending] = useState<boolean>(false);

  const {
    runLogState,
    setRunLogState,
  } = useContext<RunLogContextInterface>(RunLogContext);

  const loginUserFromForm = async () => {
    setIsSending(true);
    const login: LoginUser = {
      username,
      password,
    };
    try {
      const loginResponse = await loginUser(login);
      setRunLogState({
        ...runLogState,
        authState: {
          username: loginResponse.username,
          userType: loginResponse.userType,
          isLoggedIn: true,
        },
      });
      history.push({ pathname: '/list' });
      setIsSending(false);
    } catch (exception) {
      setIsSending(false);
    }
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
          <Button type="submit" color="violet" disabled={!username || !password || isSending} onClick={loginUserFromForm}>{t('login.submit')}</Button>
        </Form>
      </Container>
    </div>
  );
};
export default LoginPage;
