export type AppConfig = {
  PORT?: number | string;
  HOST: string;
};

export type CorsConfig = {
  allowOrigin: string;
};

export type DBConfig = {
  HOST: string;
  PORT: number;
  DATABASE: string;
  PASSWORD: string;
  USER: string;
};

export type SessionConfig = {
  SECRET: string;
};

export type AuthConfig = {
  CLIENT_ID: string;
  CLIENT_SECRET: any;
  CALLBACK_URL: string;
};

export default interface Config {
  app: AppConfig;
  db: Partial<DBConfig>;
  cors: CorsConfig;
  passport: Record<'JWT', Partial<AuthConfig>>;
  sessions: SessionConfig;
}
