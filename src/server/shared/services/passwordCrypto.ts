import { compare, genSalt, hash } from 'bcryptjs';

const SALT_RONDOMS = 8;

const hashPassword = async (password: string) => {
  const saltGenerated = await genSalt(SALT_RONDOMS);

  return await hash(password, saltGenerated);
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await compare(password, hashedPassword);
};

export const passwordCrypto = {
  hashPassword,
  verifyPassword,
};
