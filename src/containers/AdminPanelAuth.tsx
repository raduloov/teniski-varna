import React, { useState } from 'react';
import styled from 'styled-components';
import { Color } from '../assets/constants';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { useAuth } from '../hooks/useAuth';

export const AdminPanelAuth = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { signIn, isLoading } = useAuth();

  return (
    <Container>
      <Title>Admin Panel</Title>
      <PanelContainer>
        <InputContainer>
          <Text>Admin Email</Text>
          <Input
            placeholder={'Email...'}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Text>Admin Password</Text>
          <Input
            placeholder={'Password...'}
            onChange={(e) => setPassword(e.target.value)}
            password
          />
        </InputContainer>
        <ButtonContainer>
          <Button label={'Sign in'} onClick={() => signIn(email, password)} />
        </ButtonContainer>
      </PanelContainer>
    </Container>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
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