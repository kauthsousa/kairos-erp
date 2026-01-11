"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Definindo a estrutura do usuário para evitar o erro 'any'
export interface User {
    id: string;
    name: string;
    lastName?: string;
    email: string;
    telefone?: string;
    cnpj?: string;
    profile_photo?: string;
    pais?: string;
    estado?: string;
    cidade?: string;
    bairro?: string;
    rua?: string;
    numero?: string;
    cep?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Persistência: Recupera o usuário do localStorage ao carregar a página
        const savedUser = localStorage.getItem("kairos_user");
        if (savedUser) {
        try {
            setUser(JSON.parse(savedUser));
        } catch (error) {
            console.error("Erro ao carregar sessão:", error);
        }
        }
        setLoading(false);
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem("kairos_user", JSON.stringify(userData));
        router.push("/dashboard");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("kairos_user");
        router.push("/signin");
    };

    // Dentro do seu AuthProvider
    const fetchUserData = async (email: string) => {
        try {
            const res = await fetch(`/api/user/profile?email=${email}`);
            const data = await res.json();
            if (res.ok) {
            // Aqui você atualiza o estado do usuário com os dados REAIS do banco
            setUser({
                id: data.id,
                name: data.nome,
                lastName: data.sobrenome,
                email: data.email,
                telefone: data.telefone,
                cnpj: data.cnpj,
                profile_photo: data.profile_photo,
                rua: data.rua,
                numero: data.numero,
                bairro: data.bairro,
                cep: data.cep,
                cidade: data.cidade,
                estado: data.estado,
                pais: data.pais,
            });
            }
        } catch (error) {
            console.error("Erro ao carregar dados do banco:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    return context;
};