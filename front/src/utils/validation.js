import * as Api from 'api/api';

export function emailvalidation(email) {
  const emailRegex = new RegExp(
    /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    'gi'
  );
  return emailRegex.test(email);
}

export async function isEmailCheck(email) {
  try {
    const response = await Api.get('/users');
    response.data.map((user) => {
      if (user.email === email) {
        return false;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export function phoneNumberValidator(phoneNumber) {
  const phoneNumberRegex = new RegExp(/^\d{2,3}-\d{3,4}-\d{4}$/);

  return phoneNumberRegex.test(phoneNumber);
}
