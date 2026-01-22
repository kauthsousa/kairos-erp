import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { 
            email, nome, sobrenome, telefone, cnpj, 
            rua, numero, bairro, cep, cidade, estado, pais,
            profile_photo 
        } = body;

        if (!email) {
            return NextResponse.json({ error: "Email é obrigatório" }, { status: 400 });
        }

        // Executa o UPDATE no banco de dados
        await query({
            query: `
                UPDATE users 
                SET nome = ?, sobrenome = ?, telefone = ?, cnpj = ?, 
                    rua = ?, numero = ?, bairro = ?, cep = ?, 
                    cidade = ?, estado = ?, pais = ?, profile_photo = ?
                WHERE email = ?
            `,
            values: [
                nome, sobrenome, telefone, cnpj, 
                rua, numero, bairro, cep, 
                cidade, estado, pais, profile_photo, 
                email
            ],
        });

        return NextResponse.json({ message: "Perfil atualizado com sucesso!" }, { status: 200 });

    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Erro ao atualizar perfil";
        return NextResponse.json({ error: msg }, { status: 500 });
    }
}