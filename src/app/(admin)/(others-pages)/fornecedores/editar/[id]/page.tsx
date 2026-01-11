"use client"; // Necessário para interatividade no Next.js

import React, { useState } from "react";
import PageBreadcrumb from "../../../../../../components/common/PageBreadCrumb";
import { BoxCubeIcon } from "../../../../../../icons/index"; // Usando o ícone disponível no seu projeto

const EditarFornecedor = () => {
    // Estados para gerenciar os dados do formulário
    // Em uma aplicação real, você usaria um useEffect para buscar esses dados pelo ID da URL
    const [formData, setFormData] = useState({
        nome: "Distribuidora Kairós",
        telefone: "(11) 4002-8922",
        cnpj: "00.000.000/0001-00",
        categoria: "Tecidos e Linhas"
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Dados atualizados:", formData);
        alert("Fornecedor atualizado com sucesso!");
    };

    return (
        <div className="mx-auto max-w-270">
        <PageBreadcrumb 
            pageTitle="Editar Fornecedor" 
            customLinks={[{ name: "Fornecedores", route: "/fornecedores" }]} 
        />

        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
            {/* Cabeçalho do Card com Ícone de Caixa (Suprimentos) */}
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3 flex items-center gap-3">
            <BoxCubeIcon /> 
            <h3 className="font-medium text-dark dark:text-white">Informações do Fornecedor</h3>
            </div>
            
            <form className="p-7" onSubmit={handleSubmit}>
            {/* Linha 1: Nome e Telefone */}
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                    Nome da Empresa / Fornecedor
                </label>
                <input 
                    type="text" 
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 outline-none focus:border-[#fb6514] dark:border-dark-3 dark:bg-dark-2" 
                />
                </div>
                <div className="w-full sm:w-1/2">
                <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                    Telefone/WhatsApp
                </label>
                <input 
                    type="text" 
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 outline-none focus:border-[#fb6514] dark:border-dark-3 dark:bg-dark-2" 
                />
                </div>
            </div>

            {/* Linha 2: CNPJ e Categoria */}
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                <div className="w-full sm:w-1/2">
                <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                    CNPJ
                </label>
                <input 
                    type="text" 
                    value={formData.cnpj}
                    onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                    className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 outline-none focus:border-[#fb6514] dark:border-dark-3 dark:bg-dark-2" 
                />
                </div>
                <div className="w-full sm:w-1/2">
                <label className="mb-3 block text-sm font-medium text-dark dark:text-white">
                    Categoria de suprimentos
                </label>
                <input 
                    type="text" 
                    value={formData.categoria}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                    placeholder="Ex: Aviamentos, Embalagens"
                    className="w-full rounded-lg border border-stroke bg-transparent px-4.5 py-3 outline-none focus:border-[#fb6514] dark:border-dark-3 dark:bg-dark-2" 
                />
                </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end gap-4.5 border-t border-stroke pt-6 dark:border-dark-3">
                <button 
                type="button"
                onClick={() => window.history.back()}
                className="flex justify-center rounded-lg border border-stroke px-6 py-2.5 font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                >
                Cancelar
                </button>
                <button 
                type="submit"
                className="flex justify-center rounded-lg bg-[#fb6514] px-6 py-2.5 font-medium text-white hover:bg-opacity-90"
                >
                Salvar Alterações
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default EditarFornecedor;