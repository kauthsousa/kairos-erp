"use client"; // Essencial para usar useState e eventos de clique

import React, { useState } from "react";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import Link from "next/link";
import Image from "next/image";

const FornecedoresPage = () => {
    // Estado para controlar a exibição do modal de exclusão
    const [exibirModal, setExibirModal] = useState(false);
    const [idParaExcluir, setIdParaExcluir] = useState<number | null>(null);

    // Simulação de dados
    const fornecedorExemplo = {
        id: 1,
        nome: "Distribuidora Kairós",
        telefone: "(11) 4002-8922",
        cnpj: "00.000.000/0001-00"
    };

    // Função para abrir o modal e salvar o ID
    const confirmarExclusao = (id: number) => {
        setIdParaExcluir(id);
        setExibirModal(true);
    };

    const executarExclusao = () => {
        console.log("Excluindo fornecedor:", idParaExcluir);
        setExibirModal(false);
        // Aqui você adicionaria a lógica de deleção real (API)
    };

    return (
        <>
        <div className="mx-auto max-w-7xl">
            <PageBreadcrumb pageTitle="Fornecedores" />

            <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
            <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
                <h4 className="text-body-2xl font-bold text-dark dark:text-white">Base de Fornecedores</h4>
                <Link 
                    href="/fornecedores/cadastro" 
                    className="inline-flex items-center justify-center rounded-md bg-[#fb6514] px-6 py-2.5 text-center font-medium text-white hover:bg-opacity-90"
                >
                    + Adicionar Fornecedor
                </Link>
            </div>

            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto text-left">
                <thead>
                    <tr className="bg-gray-2 dark:bg-dark-2">
                    <th className="px-4 py-4 font-medium text-dark dark:text-white">Nome/Razão Social</th>
                    <th className="px-4 py-4 font-medium text-dark dark:text-white">Telefone</th>
                    <th className="px-4 py-4 font-medium text-dark dark:text-white">CNPJ</th>
                    <th className="px-4 py-4 font-medium text-dark dark:text-white text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-dark-3 text-dark dark:text-white">
                        {fornecedorExemplo.nome}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-dark-3 text-dark dark:text-white">
                        {fornecedorExemplo.telefone}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-dark-3 text-dark dark:text-white">
                        {fornecedorExemplo.cnpj}
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-dark-3">
                        <div className="flex items-center justify-center gap-3.5">
                        {/* Botão Visualizar - Novo */}
                        <Link 
                            href={`/fornecedores/visualizar/${fornecedorExemplo.id}`} 
                            className="hover:text-[#fb6514]" 
                            title="Visualizar Detalhes"
                        >
                            <Image src="/images/icons/olho.svg" alt="Visualizar" width={18} height={18} />
                        </Link>

                        {/* Botão Editar */}
                        <Link 
                            href={`/fornecedores/editar/${fornecedorExemplo.id}`} 
                            className="hover:text-[#fb6514]" 
                            title="Editar"
                        >
                            <Image src="/images/icons/editar.svg" alt="Editar" width={18} height={18} />
                        </Link>

                        {/* Botão Deletar */}
                        <button 
                            onClick={() => confirmarExclusao(fornecedorExemplo.id)} 
                            className="hover:text-[#e11d48]" 
                            title="Deletar"
                        >
                            <Image src="/images/icons/lixo.svg" alt="Deletar" width={18} height={18} />
                        </button>
                        </div>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </div>

        {/* Modal de Confirmação de Exclusão */}
        {exibirModal && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-[400px] rounded-lg bg-white p-6 text-center dark:bg-gray-dark shadow-xl">
                <h3 className="mb-2 text-xl font-bold text-dark dark:text-white">Confirmar Exclusão</h3>
                <p className="mb-6 text-sm text-gray-500">
                Tem certeza que deseja excluir o fornecedor <strong>{fornecedorExemplo.nome}</strong>? Esta ação não pode ser desfeita.
                </p>
                <div className="flex gap-3">
                <button 
                    onClick={() => setExibirModal(false)}
                    className="flex-1 rounded-md border border-stroke py-2 text-dark hover:bg-gray-100 dark:border-dark-3 dark:text-white"
                >
                    Cancelar
                </button>
                <button 
                    onClick={executarExclusao}
                    className="flex-1 rounded-md bg-red-600 py-2 text-white hover:bg-red-700"
                >
                    Sim, Excluir
                </button>
                </div>
            </div>
            </div>
        )}
        </>
    );
};

export default FornecedoresPage;