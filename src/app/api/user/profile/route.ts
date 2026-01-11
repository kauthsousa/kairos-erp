import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET(request: Request) {
    try {
        // Pegue o email dos parâmetros da URL ou da sua sessão de auth
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
        return NextResponse.json({ error: "Email não fornecido" }, { status: 400 });
        }

        const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        });

        // Seleciona todos os campos necessários
        const [rows]: any = await connection.execute(
        "SELECT nome, sobrenome, email, telefone, cnpj, profile_photo, rua, numero, bairro, cep, cidade, estado, pais FROM users WHERE email = ?",
        [email]
        );

        await connection.end();

        if (rows.length === 0) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}