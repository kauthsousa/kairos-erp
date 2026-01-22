import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};

// MÉTODO GET: Listar clientes filtrados pelo usuário logado
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "Usuário não identificado" }, { status: 400 });
        }

        const connection = await mysql.createConnection(dbConfig);
        
        const [rows] = await connection.execute(
            "SELECT id, nome_completo AS nome, cpf, telefone FROM clientes WHERE user_id = ? ORDER BY id DESC",
            [userId]
        );

        await connection.end();
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 });
    }
}

// MÉTODO POST: Salvar novo cliente vinculado ao usuário
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nomeCompleto, cpf, telefone, dataNascimento, endereco, userId } = body;

        if (!userId) {
            return NextResponse.json({ error: "ID do usuário é obrigatório" }, { status: 400 });
        }

        const connection = await mysql.createConnection(dbConfig);

        const query = `
            INSERT INTO clientes (nome_completo, cpf, telefone, data_nascimento, endereco, user_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        await connection.execute(query, [
            nomeCompleto,
            cpf,
            telefone,
            dataNascimento,
            endereco,
            userId
        ]);

        await connection.end();
        return NextResponse.json({ message: "Cliente salvo com sucesso!" }, { status: 201 });
    } catch (error) {
        console.error("Erro ao salvar cliente:", error);
        return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
    }
}

// MÉTODO DELETE: Excluir cliente
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
        }

        const connection = await mysql.createConnection(dbConfig);
        await connection.execute("DELETE FROM clientes WHERE id = ?", [id]);
        await connection.end();

        return NextResponse.json({ message: "Cliente excluído com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
}