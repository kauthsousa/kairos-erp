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

        // Adicionamos um log para depurar no terminal do VS Code
        console.log(`Buscando perfil para: ${email}`);

        const results = await query({
        query: "SELECT * FROM users WHERE email = ?",
        values: [email],
        });

        // Verificação de segurança: se results não for um array ou estiver vazio
        if (!Array.isArray(results) || results.length === 0) {
        return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
        }

        const dbUser = results[0] as UserData;

        // Retorno com tratamento de nulos para evitar quebras no frontend
        return NextResponse.json({
        id: String(dbUser.id), // Garantindo conversão para string
        nome: dbUser.nome || "",
        sobrenome: dbUser.sobrenome || "",
        email: dbUser.email,
        telefone: dbUser.telefone || "",
        cnpj: dbUser.cnpj || "",
        profile_photo: dbUser.profile_photo || "/images/user/owner.jpg",
        rua: dbUser.rua || "",
        numero: dbUser.numero || "",
        bairro: dbUser.bairro || "",
        cep: dbUser.cep || "",
        cidade: dbUser.cidade || "",
        estado: dbUser.estado || "",
        pais: dbUser.pais || "Brasil",
        });
        
    } catch (error: unknown) {
        // Log detalhado para você ver o erro real no terminal
        console.error("ERRO CRÍTICO NA API DE PERFIL:", error);
        
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
        return NextResponse.json(
            { error: "Erro interno no servidor", details: errorMessage }, 
            { status: 500 }
            );
        }
}