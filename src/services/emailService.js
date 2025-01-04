import emailjs from '@emailjs/browser';

const serviceID = process.env.REACT_APP_SERVICE_ID;
const templateID = process.env.REACT_APP_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_PUBLIC_KEY;

export const sendEmail = async (toEmail, token) => {
  const templateParams = {
    user_email: toEmail,
    token: token
  };

  try {
    emailjs.send(serviceID, templateID, templateParams, publicKey);
    return true;
  } catch (error) {
    return false;
  }
};
