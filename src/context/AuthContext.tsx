"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

// Interface definida para evitar erros de tipagem no VS Code
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

    /**
     * Função para buscar dados atualizados do MySQL.
     * Resolve o erro de 'fetchUserData is declared but never read'.
     */
    const fetchUserData = async (email: string) => {
        try {
            const res = await fetch(`/api/user/profile?email=${email}`);
            const data = await res.json();
            
            if (res.ok) {
                // Mapeamento: Banco (data.nome) -> Interface (name)
                const updatedUser: User = {
                    id: data.id,
                    name: data.nome || "",
                    lastName: data.sobrenome || "",
                    email: data.email,
                    telefone: data.telefone || "",
                    cnpj: data.cnpj || "",
                    profile_photo: data.profile_photo || "/images/user.png",
                    rua: data.rua || "",
                    numero: data.numero || "",
                    bairro: data.bairro || "",
                    cep: data.cep || "",
                    cidade: data.cidade || "",
                    estado: data.estado || "",
                    pais: data.pais || "Brasil",
                };
                
                setUser(updatedUser);
                // Atualiza o storage com os dados completos para persistência
                localStorage.setItem("kairos_user", JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error("Erro ao sincronizar dados com o banco:", error);
        }
    };

    /**
     * Efeito de inicialização: Recupera a sessão e busca dados frescos no banco.
     */
    useEffect(() => {
        const savedUser = localStorage.getItem("kairos_user");
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                
                // ESSA LINHA FAZ A BUSCA ACONTECER:
                if (parsedUser.email) {
                    fetchUserData(parsedUser.email);
                }
            } catch (error) {
                console.error("Erro ao carregar sessão:", error);
            }
        }
        setLoading(false);
    }, []); // Isso roda uma vez quando o app abre

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