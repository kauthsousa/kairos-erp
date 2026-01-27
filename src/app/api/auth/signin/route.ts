import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

interface UserRow {
    id: number;
    nome: string;
    sobrenome: string; 
    email: string;
    senha: string;
}

export async function POST(request: Request) {
    try {
        // Adicionando um check para garantir que o body não está vazio
        const body = await request.json();
        const { email, senha } = body;

        if (!email || !senha) {
            return NextResponse.json({ message: "Dados insuficientes" }, { status: 400 });
        }

        // 1. Busca o usuário
        const users = await query({
            query: "SELECT id, nome, sobrenome, email, senha FROM users WHERE email = ?",
            values: [email],
        }) as UserRow[];

        if (!users || users.length === 0) {
            return NextResponse.json(
                { message: "Usuário não encontrado." },
                { status: 401 }
            );
        }

        const user = users[0];

        // 2. Compara a senha (bcrypt)
        const passwordMatch = await bcrypt.compare(senha, user.senha);

        if (!passwordMatch) {
            return NextResponse.json(
                { message: "Senha incorreta." },
                { status: 401 }
            );
        }

        // 3. Sucesso - Garantindo que o id seja string e campos nulos sejam tratados
        return NextResponse.json({
            message: "Login realizado com sucesso!",
            user: {
                id: String(user.id),
                name: user.nome || "",
                lastName: user.sobrenome || "", 
                email: user.email
            }
        }, { status: 200 });

    } catch (error: unknown) {
        // LOG IMPORTANTE: Isso aparecerá no terminal do VS Code, não no navegador
        console.error("ERRO CRÍTICO NO LOGIN:", error);

        const msg = error instanceof Error ? error.message : "Erro interno";
        return NextResponse.json(
            { message: "Erro ao entrar", error: msg }, 
            { status: 500 }
        );
    }
}