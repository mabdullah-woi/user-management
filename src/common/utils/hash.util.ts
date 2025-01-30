import * as bcrypt from 'bcrypt';

// At least one uppercase, one lowercase, one number, one symbol and eight characters.
export const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const saltRounds = 12;

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

export const compareHash = async (password: string, passwordHash: string) => {
  return bcrypt.compare(password, passwordHash);
};
