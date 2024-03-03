import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import getConfig from '../config/db.config.js';
import * as schema from './schema.js';

const cfg = getConfig();

// TODO: find a proper way to switch database driver
const pool = new pg.Pool({
  host: cfg.Host,
  port: Number(cfg.Port),
  user: cfg.User,
  password: cfg.Password,
  database: cfg.Name,
});

// TODO: find a proper way to switch database driver, and init drizzle db
export const db = drizzle(pool, {
  schema: schema,
  logger: cfg.Debug,
});
