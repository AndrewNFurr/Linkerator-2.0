const client = require("./client");

const sync = async (force = false) => {
  if (force) {
    await client.query(`
      DROP TABLE IF EXISTS links;
      DROP TABLE IF EXISTS tags;
    `);
  }
  

  await client.query(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS links(
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      link text NOT NULL UNIQUE CONSTRAINT link_length CHECK(LENGTH(link) > 0),
      comment text,
      clickCount integer NOT NULL DEFAULT 1 CONSTRAINT positive_count CHECK(clickCount > 0)
    );

    CREATE TABLE IF NOT EXISTS tags(
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      tag text NOT NULL UNIQUE CONSTRAINT tag_length CHECK(LENGTH(tag) > 0)
    );

    CREATE TABLE IF NOT EXISTS link_tags(
      link_id uuid REFERENCES links(id),
      tag_id uuid REFERENCES tags(id),
      PRIMARY KEY(link_id, tag_id)
    );
  `);
};

module.exports = sync;
