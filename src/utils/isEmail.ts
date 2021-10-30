const EMAIL_REGEX = /^[a-z.+0-9]+@[a-z.0-9]+\.[a-z]{2,}$/i;

export const isEmail = (email: string) => EMAIL_REGEX.test(email);
