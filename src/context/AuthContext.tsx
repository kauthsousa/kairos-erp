"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";

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
    refreshUser: () => Promise<void>; // Adicionado para permitir atualizar os dados manualmente
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Função para buscar dados REAIS do banco de dados
    const fetchUserData = useCallback(async (email: string) => {
        try {
            const res = await fetch(`/api/user/profile?email=${email}`);
            const data = await res.json();
            
            if (res.ok) {
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
                localStorage.setItem("kairos_user", JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error("Erro ao sincronizar dados com o banco:", error);
        }
    }, []);

    // Carregamento inicial da sessão
    useEffect(() => {
        const initializeAuth = async () => {
            const savedUser = localStorage.getItem("kairos_user");
            if (savedUser) {
                try {
                    const parsedUser = JSON.parse(savedUser);
                    setUser(parsedUser);
                    
                    if (parsedUser.email) {
                        await fetchUserData(parsedUser.email);
                    }
                } catch (error) {
                    console.error("Erro ao carregar sessão:", error);
                    localStorage.removeItem("kairos_user");
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, [fetchUserData]);

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

    const refreshUser = async () => {
        if (user?.email) {
            await fetchUserData(user.email);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};