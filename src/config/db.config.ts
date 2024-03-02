import dotenv from 'dotenv';
dotenv.config();

type config = {
  Dirver: string;
  Host: string;
  Port: string;
  Name: string;
  User: string;
  Password: string;
};

const getConfig = (): config => {
  return {
    Dirver: process.env.APP_DATABASE_DRIVER || '',
    Host: process.env.APP_DATABASE_HOST || '',
    Port: process.env.APP_DATABASE_PORT || '',
    Name: process.env.APP_DATABASE_NAME || '',
    User: process.env.APP_DATABASE_USER || '',
    Password: process.env.APP_DATABASE_PASSWORD || '',
  };
};

export default getConfig;
