"use client";

import React, { useState, useEffect } from "react";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../../../context/AuthContext"; // Certifique-se que o caminho está correto

interface Cliente {
    id: number;
    nome: string;
    telefone: string;
    cpf: string;
}

const ClientesPage = () => {
    const { user } = useAuth();
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);
    const [exibirModal, setExibirModal] = useState(false);
    const [clienteParaExcluir, setClienteParaExcluir] = useState<Cliente | null>(null);

    // Função para buscar dados do MySQL filtrando pelo ID do usuário
    const carregarClientes = async () => {
        if (!user?.id) return;
        
        try {
            const res = await fetch(`/api/clientes?userId=${user.id}`);
            const data = await res.json();
            
            if (res.ok) {
                setClientes(Array.isArray(data) ? data : []);
            }
        } catch {
            // Removido o 'error' não utilizado para evitar o erro do ESLint
            console.error("Erro ao carregar clientes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id) {
            carregarClientes();
        }
    }, [user]);

    const confirmarExclusao = (cliente: Cliente) => {
        setClienteParaExcluir(cliente);
        setExibirModal(true);
    };

    const executarExclusao = async () => {
        if (!clienteParaExcluir) return;
        
        try {
            const res = await fetch(`/api/clientes?id=${clienteParaExcluir.id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setExibirModal(false);
                carregarClientes(); // Recarrega a lista após excluir
            } else {
                alert("Erro ao excluir o cliente.");
            }
        } catch {
            // Corrigido: catch sem variável para evitar erro 'error is defined but never used'
            alert("Erro de conexão ao tentar excluir.");
        }
    };

    return (
        <>
            <div className="mx-auto max-w-7xl">
                <PageBreadcrumb pageTitle="Clientes" />

                <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
                    <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
                        <h4 className="text-body-2xl font-bold text-dark dark:text-white">Base de Clientes</h4>
                        <Link 
                            href="/clientes/cadastro" 
                            className="inline-flex items-center justify-center rounded-md bg-[#fb6514] px-6 py-2.5 text-center font-medium text-white hover:bg-opacity-90"
                        >
                            + Adicionar Cliente
                        </Link>
                    </div>

                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto text-left">
                            <thead>
                                <tr className="bg-gray-2 dark:bg-dark-2">
                                    <th className="px-4 py-4 font-medium text-dark dark:text-white">Nome</th>
                                    <th className="px-4 py-4 font-medium text-dark dark:text-white">Telefone</th>
                                    <th className="px-4 py-4 font-medium text-dark dark:text-white">CPF</th>
                                    <th className="px-4 py-4 font-medium text-dark dark:text-white text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan={4} className="text-center py-10">Carregando clientes...</td></tr>
                                ) : clientes.length === 0 ? (
                                    <tr><td colSpan={4} className="text-center py-10">Nenhum cliente encontrado.</td></tr>
                                ) : (
                                    clientes.map((cliente) => (
                                        <tr key={cliente.id}>
                                            <td className="border-b border-[#eee] px-4 py-5 dark:border-dark-3 text-dark dark:text-white">
                                                {cliente.nome}
                                            </td>
                                            <td className="border-b border-[#eee] px-4 py-5 dark:border-dark-3 text-dark dark:text-white">
                                                {cliente.telefone}
                                            </td>
                                            <td className="border-b border-[#eee] px-4 py-5 dark:border-dark-3 text-dark dark:text-white">
                                                {cliente.cpf}
                                            </td>
                                            <td className="border-b border-[#eee] px-4 py-5 dark:border-dark-3">
                                                <div className="flex items-center justify-center gap-3.5">
                                                    <Link href={`/clientes/visualizar/${cliente.id}`} title="Visualizar">
                                                        <Image src="/images/icons/olho.svg" alt="Ver" width={18} height={18} />
                                                    </Link>
                                                    <Link href={`/clientes/editar/${cliente.id}`} title="Editar">
                                                        <Image src="/images/icons/editar.svg" alt="Editar" width={18} height={18} />
                                                    </Link>
                                                    <button onClick={() => confirmarExclusao(cliente)} className="hover:text-[#e11d48]" title="Deletar">
                                                        <Image src="/images/icons/lixo.svg" alt="Deletar" width={18} height={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal de Exclusão */}
            {exibirModal && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
                    <div className="w-full max-w-[400px] rounded-lg bg-white p-6 text-center dark:bg-gray-dark shadow-xl">
                        <h3 className="mb-2 text-xl font-bold text-dark dark:text-white">Confirmar Exclusão</h3>
                        <p className="mb-6 text-sm text-gray-500">
                            Tem certeza que deseja excluir o cliente <strong>{clienteParaExcluir?.nome}</strong>?
                        </p>
                        <div className="flex gap-3">
                            <button onClick={() => setExibirModal(false)} className="flex-1 rounded-md border border-stroke py-2 text-dark hover:bg-gray-100 dark:border-dark-3 dark:text-white">Cancelar</button>
                            <button onClick={executarExclusao} className="flex-1 rounded-md bg-red-600 py-2 text-white hover:bg-red-700">Sim, Excluir</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ClientesPage;