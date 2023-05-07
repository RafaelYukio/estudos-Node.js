import pg from "pg";

// Conceito de pool de conexão
async function connect() {
  if (global.connection) {
    return global.connection.connect();
  }
  const pool = new pg.Pool({
    // URL da conexão do ElephantSQL
    connectionString:
      "",
  });
  global.connection = pool;
  return pool.connect();
}

export { connect };
