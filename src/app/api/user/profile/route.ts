import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface UserData {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    telefone?: string;
    cnpj?: string;
    profile_photo?: string;
    rua?: string;
    numero?: string;
    bairro?: string;
    cep?: string;
    cidade?: string;
    estado?: string;
    pais?: string;
    }

    export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
        return NextResponse.json({ error: "Email não fornecido" }, { status: 400 });
        }

        // Executa a query usando a função que já funciona no seu login
        const results = await query({
        query: "SELECT * FROM users WHERE email = ?",
        values: [email],
        }) as UserData[];

        if (results.length === 0) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
        }

        const dbUser = results[0];

        // Retorna os dados mapeados para o frontend
        return NextResponse.json({
        id: dbUser.id.toString(),
        nome: dbUser.nome,
        sobrenome: dbUser.sobrenome || "", // Garante que o sobrenome seja enviado
        email: dbUser.email,
        telefone: dbUser.telefone || "",
        cnpj: dbUser.cnpj || "",
        profile_photo: dbUser.profile_photo || "",
        rua: dbUser.rua || "",
        numero: dbUser.numero || "",
        bairro: dbUser.bairro || "",
        cep: dbUser.cep || "",
        cidade: dbUser.cidade || "",
        estado: dbUser.estado || "",
        pais: dbUser.pais || "Brasil",
        });
    } catch (error: unknown) {
        // Tratamento de erro robusto sem usar 'any'
        const errorMessage = error instanceof Error ? error.message : "Erro interno no servidor";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}