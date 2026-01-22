import mysql, { PoolOptions } from 'mysql2/promise';

const poolConfig: PoolOptions = {
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

if (process.env.INSTANCE_CONNECTION_NAME) {
    poolConfig.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
} else {
    poolConfig.host = process.env.MYSQL_HOST || '127.0.0.1';
}

const pool = mysql.createPool(poolConfig);

export async function query({ query, values }: { query: string; values?: unknown[] }) {
    try {
        const [results] = await pool.execute(query, values);
        return results;
    } catch {
        throw new Error('Erro ao executar a query no banco de dados.');
    }
}

export default pool;