import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import getConfig from '../config/db.config.js';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const cfg = getConfig();

const pool = new pg.Pool({
  host: cfg.Host,
  port: Number(cfg.Port),
  user: cfg.User,
  password: cfg.Password,
  database: cfg.Name,
});

const db = drizzle(pool);

const main = async () => {
  try {
    console.log('schema migration started...');

    await migrate(db, {
      migrationsFolder: 'src/db/migrations',
    });

    console.log('schema migration success!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
