import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Color } from '../../assets/constants';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';

export const AdminPanelAuth = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { signIn, isLoading, error } = useAuth();

  useEffect(() => {
    if (error) {
      const errorMessage = error.includes('invalid-email')
        ? 'Invalid email.'
        : error.includes('wrong-password')
        ? 'Wrong password.'
        : "Couldn't sign in";

      toast.error(errorMessage);
    }
  }, [error]);

  return (
    <Container>
      <Title>Admin Panel</Title>
      <PanelContainer>
        <InputContainer>
          <Text>Email</Text>
          <Input
            value={email}
            placeholder={'Email...'}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Text>Password</Text>
          <Input
            value={password}
            placeholder={'Password...'}
            onChange={(e) => setPassword(e.target.value)}
            type={'password'}
          />
        </InputContainer>
        <ButtonContainer>
          <Button
            label={'Sign in'}
            loading={isLoading}
            onClick={() => signIn(email, password)}
          />
          <BackLinkText to={'/'}>
            <p>Back to Teniski-Varna</p>
          </BackLinkText>
        </ButtonContainer>
      </PanelContainer>
    </Container>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const BackLinkText = styled(Link)`
  text-decoration: none;
  color: ${Color.LIGHT_GRAY};
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  color: ${Color.WHITE};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 30px;
`;

const PanelContainer = styled.div`
  width: 90%;
  background: ${Color.MEDIUM_GRAY};
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 30px;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
