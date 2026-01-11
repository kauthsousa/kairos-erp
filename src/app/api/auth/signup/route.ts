import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

// Interface para evitar o erro 'any'
interface UserRow {
  id: number;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nome, sobrenome, email, senha } = body;

        // Cast para 'UserRow[]' remove o erro de 'any'
        const existingUser = await query({
            query: "SELECT id FROM users WHERE email = ?",
            values: [email],
        }) as UserRow[];

        if (existingUser.length > 0) {
            return NextResponse.json({ message: "E-mail já cadastrado" }, { status: 409 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        await query({
            query: "INSERT INTO users (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)",
            values: [nome, sobrenome, email, hashedPassword],
            });

            return NextResponse.json({ message: "Usuário criado!" }, { status: 201 });

    } catch (error: unknown) {
        // Tratamento seguro do tipo 'unknown'
        const msg = error instanceof Error ? error.message : "Erro desconhecido";
        return NextResponse.json({ message: "Erro no servidor", error: msg }, { status: 500 });
    }
}