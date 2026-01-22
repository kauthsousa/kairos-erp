import { NextResponse } from "next/server";
<<<<<<< HEAD
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
=======
import mysql from "mysql2/promise";

export async function GET(request: Request) {
    try {
        // Pegue o email dos parâmetros da URL ou da sua sessão de auth
>>>>>>> fac219cd88042150cf375520ed85a8baec694f27
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
        return NextResponse.json({ error: "Email não fornecido" }, { status: 400 });
        }

<<<<<<< HEAD
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
=======
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
>>>>>>> fac219cd88042150cf375520ed85a8baec694f27
    }
}