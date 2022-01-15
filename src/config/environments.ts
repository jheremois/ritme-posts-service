import ConfigTypes from "./config";

import dotenv from "dotenv";
dotenv.config({path: './.env'})

const appConfigLocal: ConfigTypes = {

  app: {
    PORT: Number(process.env.APP_PORT_LOCAL),
    HOST: process.env.APP_HOST_LOCAL || '192.168.1.29',
  },

  db: {
    PORT: Number(process.env.DB_PORT_LOCAL),
    HOST: process.env.DB_HOST_LOCAL,
    USER: process.env.DB_USER_LOCAL,
    DATABASE: process.env.DATABASE_LOCAL,
    PASSWORD: process.env.DB_PASSWORD_LOCAL,
  },
  cors: {
    allowOrigin: process.env.ALLOW_ORIGIN_LOCAL || 'http://localhost:4000',
  },
  sessions: {
    SECRET: process.env.CLIENT_SECRET_LOCAL || 'sessions',
  },
  passport: {
    JWT: {
      CLIENT_ID: process.env.JWT_CLIENT_ID_LOCAL,
      CLIENT_SECRET: process.env.JWT_CLIENT_SECRET_LOCAL || "lapara01",
      CALLBACK_URL: process.env.JWT_CALLBACK_URL_LOCAL,
    }
  },
};

const appConfigDev: ConfigTypes = {
  app: {
    //PORT: Number(process.env.PORT) || 4000,
    HOST: process.env.APP_HOST_DEV || '192.168.1.29',
  },
  db: {
    HOST: process.env.DB_HOST_DEV,
    PORT: Number(process.env.DB_PORT_DEV),
    DATABASE: process.env.DATABASE_DEV,
    PASSWORD: process.env.DB_PASSWORD_DEV,
    USER: process.env.DB_USER_DEV,
  },
  cors: {
    allowOrigin: process.env.ALLOW_ORIGIN_DEV || 'http://localhost:4000',
  },
  sessions: {
    SECRET: process.env.CLIENT_SECRET_DEV || 'sessions',
  },
  passport: {
    JWT: {
      CLIENT_ID: process.env.JWT_CLIENT_ID_DEV || "",
      CLIENT_SECRET: process.env.JWT_CLIENT_SECRET_DEV || "lapara01",
      CALLBACK_URL: process.env.JWT_CALLBACK_URL_DEV || "",
    }
  },
};

const appConfig = appConfigDev

export default appConfig;