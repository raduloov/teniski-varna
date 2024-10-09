import emailjs from '@emailjs/browser';

emailjs.init({ publicKey: '8i8YQfvoANR8Wu0wa' });

export const sendEmail = () => {
  emailjs.send('service_kw3klyk', 'template_mi97k92', {
    message: 'This is a test message',
    from_name: 'Test User',
    to_name: 'Test User'
  });
};
