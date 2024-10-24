import { useState } from 'react';

const { REACT_APP_TENISKI_API_BASE_URL } = process.env;

export const useMailgun = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    html: string
  ) => {
    const url = `${REACT_APP_TENISKI_API_BASE_URL}/mailgun/sendEmail`;

    setIsLoading(true);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ to, subject, text, html })
      });
      const data = await response.json();
      return data;
    } catch (e: unknown) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendEmail, isLoading };
};
