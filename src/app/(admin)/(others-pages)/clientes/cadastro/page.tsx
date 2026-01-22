<<<<<<< HEAD
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { useAuth } from "@/context/AuthContext";

const CadastroCliente = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        nomeCompleto: "",
        cpf: "",
        telefone: "",
        dataNascimento: "",
        endereco: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!user?.id) {
            alert("Sessão expirada. Por favor, faça login novamente.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    userId: user.id // Importante para o filtro de usuários
                }),
            });

            if (res.ok) {
                alert("Cliente cadastrado com sucesso!");
                router.push("/clientes");
            } else {
                const errorData = await res.json();
                alert("Erro ao cadastrar: " + (errorData.error || "Erro desconhecido"));
            }
        } catch {
            // Removido 'error' para evitar o alerta do ESLint que aparece nas suas imagens
            alert("Erro de conexão com o servidor.");
        } finally {
            setLoading(false);
        }
    };

=======
import PageBreadcrumb from "../../../../../components/common/PageBreadCrumb";

const CadastroCliente = () => {
>>>>>>> fac219cd88042150cf375520ed85a8baec694f27
    return (
        <div className="mx-auto max-w-270">
            <PageBreadcrumb
                pageTitle="Novo Cliente" 
<<<<<<< HEAD
                customLinks={[{ name: "Clientes", route: "/clientes" }]}
            />

            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
                <form className="p-7" onSubmit={handleSubmit}>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Nome Completo</label>
                            <input 
                                type="text" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange}
                                placeholder="João da Silva" required
                                className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" 
                            />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">CPF</label>
                            <input 
                                type="text" name="cpf" value={formData.cpf} onChange={handleChange}
                                placeholder="000.000.000-00" 
                                className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" 
                            />
                        </div>
                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Telefone / WhatsApp</label>
                            <input 
                                type="text" name="telefone" value={formData.telefone} onChange={handleChange}
                                placeholder="(00) 00000-0000" 
                                className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" 
                            />
                        </div>
                        <div className="w-full sm:w-1/2">
                            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Data de Nascimento</label>
                            <input 
                                type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange}
                                className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" 
                            />
                        </div>
                    </div>

                    <div className="mb-5.5">
                        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Endereço Completo</label>
                        <textarea 
                            rows={3} name="endereco" value={formData.endereco} onChange={handleChange}
                            placeholder="Rua, número, bairro, cidade..." 
                            className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3"
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-4.5">
                        <button 
                            type="button" onClick={() => router.back()}
                            className="flex justify-center rounded-lg border border-stroke px-6 py-2 font-medium text-dark dark:border-dark-3 dark:text-white"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" disabled={loading}
                            className="flex justify-center rounded-lg bg-[#fb6514] px-6 py-2 font-medium text-white hover:bg-opacity-90 disabled:bg-opacity-50"
                        >
                            {loading ? "Salvando..." : "Salvar Cliente"}
                        </button>
                    </div>
=======
                customLinks={[
                    { name: "Clientes", route: "/clientes" }
                ]}
            />

            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
                <form className="p-7">
                {/* Primeira Linha: Nome e CPF */}
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Nome Completo</label>
                    <input type="text" placeholder="João da Silva" className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" />
                    </div>
                    <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">CPF</label>
                    <input type="text" placeholder="000.000.000-00" className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" />
                    </div>
                </div>

                {/* Segunda Linha: Telefone e Data de Nascimento */}
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Telefone / WhatsApp</label>
                    <input type="text" placeholder="(00) 00000-0000" className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" />
                    </div>
                    <div className="w-full sm:w-1/2">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Data de Nascimento</label>
                    <input type="date" className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3" />
                    </div>
                </div>

                {/* Terceira Linha: Endereço */}
                <div className="mb-5.5">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">Endereço Completo</label>
                    <textarea rows={3} placeholder="Rua, número, bairro, cidade..." className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 focus:border-[#fb6514] outline-none dark:border-dark-3"></textarea>
                </div>

                <div className="flex justify-end gap-4.5">
                    <button type="button" className="flex justify-center rounded-lg border border-stroke px-6 py-2 font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white">
                    Cancelar
                    </button>
                    <button type="submit" className="flex justify-center rounded-lg bg-[#fb6514] px-6 py-2 font-medium text-white hover:bg-opacity-90">
                    Salvar Cliente
                    </button>
                </div>
>>>>>>> fac219cd88042150cf375520ed85a8baec694f27
                </form>
            </div>
        </div>
    );
};

export default CadastroCliente;