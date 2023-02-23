import config from '../config';
import neo4j, { Driver } from 'neo4j-driver';

let db: Driver;

async function initializeDriver(): Promise<Driver> {
  const driver = neo4j.driver(
    config.databaseURL,
    neo4j.auth.basic(config.neo4jCreds.username, config.neo4jCreds.password),
  );
  return driver;
}

export default async (): Promise<Driver> => {
  if (!db) {
    db = await initializeDriver();
  }

  return db;
};
