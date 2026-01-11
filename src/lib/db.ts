import mysql from 'mysql2/promise';

// Criamos um pool de conexões para melhor performance
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

/**
 * Função utilitária para executar queries.
 * Substituímos 'any[]' por 'unknown[]' para satisfazer o linter.
 */
export async function query({ query, values }: { query: string; values?: unknown[] }) {
    try {
        const [results] = await pool.execute(query, values);
        return results;
    } catch (error: unknown) { // Substituído 'any' por 'unknown'
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido na query';
        throw new Error(`Erro na query: ${errorMessage}`);
    }
}

export default pool;