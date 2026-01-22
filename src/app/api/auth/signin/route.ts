import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcryptjs";

<<<<<<< HEAD
// Interface para tipar o retorno do banco e evitar erros de linting
interface UserRow {
    id: number;
    nome: string;
    sobrenome: string; // Adicionado para resolver o problema do sobrenome vazio
=======
interface UserRow {
    id: number;
    nome: string;
>>>>>>> fac219cd88042150cf375520ed85a8baec694f27
    email: string;
    senha: string;
}

export async function POST(request: Request) {
    try {
        const { email, senha } = await request.json();

<<<<<<< HEAD
        // 1. Buscar o usuário pelo e-mail com todas as colunas necessárias
        const users = await query({
            query: "SELECT id, nome, sobrenome, email, senha FROM users WHERE email = ?",
            values: [email],
        }) as UserRow[];

        if (users.length === 0) {
            return NextResponse.json(
                { message: "Usuário não encontrado." },
                { status: 401 }
            );
=======
        // 1. Buscar o usuário pelo e-mail
        const users = await query({
        query: "SELECT * FROM users WHERE email = ?",
        values: [email],
        }) as UserRow[];

        if (users.length === 0) {
        return NextResponse.json(
            { message: "Usuário não encontrado." },
            { status: 401 }
        );
>>>>>>> fac219cd88042150cf375520ed85a8baec694f27
        }

        const user = users[0];

<<<<<<< HEAD
        // 2. Comparar a senha criptografada
        const passwordMatch = await bcrypt.compare(senha, user.senha);

        if (!passwordMatch) {
            return NextResponse.json(
                { message: "Senha incorreta." },
                { status: 401 }
            );
        }

        /**
         * 3. Sucesso: Retornamos o objeto mapeado para a interface 'User' do Frontend.
         * Note que incluímos o 'lastName' vindo de 'sobrenome'.
         */
        return NextResponse.json({
            message: "Login realizado com sucesso!",
            user: {
                id: user.id.toString(),
                name: user.nome,
                lastName: user.sobrenome, // Agora o sobrenome será salvo no localStorage
                email: user.email
            }
        }, { status: 200 });

    } catch (error: unknown) {
        // Tratamento de erro robusto para evitar o erro de 'any'
        const msg = error instanceof Error ? error.message : "Erro interno";
        return NextResponse.json(
            { message: "Erro ao entrar", error: msg }, 
            { status: 500 }
        );
=======
        // 2. Comparar a senha
        const passwordMatch = await bcrypt.compare(senha, user.senha);

        if (!passwordMatch) {
        return NextResponse.json(
            { message: "Senha incorreta." },
            { status: 401 }
        );
        }

        // 3. Sucesso: Mapeamos 'nome' para 'name' para alinhar com o Frontend
        return NextResponse.json({
        message: "Login realizado com sucesso!",
        user: {
            id: user.id.toString(),
            name: user.nome, // Aqui garantimos a compatibilidade
            email: user.email
        }
        }, { status: 200 });

    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Erro interno";
        return NextResponse.json({ message: "Erro ao entrar", error: msg }, { status: 500 });
>>>>>>> fac219cd88042150cf375520ed85a8baec694f27
    }
}