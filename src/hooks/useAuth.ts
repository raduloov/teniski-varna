import { useState } from 'react';
import { getAuth, signOut, signInWithEmailAndPassword } from 'firebase/auth';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const auth = getAuth();

  const signInHandler = async (email: string, password: string) => {
    if (error !== '') {
      setError('');
    }

    try {
      setError(null);
      setIsLoading(true);

      const formattedEmail = email.toLowerCase().trim();
      await signInWithEmailAndPassword(auth, formattedEmail, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signOutHandler = async () => {
    await signOut(auth);
  };

  return {
    signIn: signInHandler,
    signOut: signOutHandler,
    isLoading,
    error
  };
};
